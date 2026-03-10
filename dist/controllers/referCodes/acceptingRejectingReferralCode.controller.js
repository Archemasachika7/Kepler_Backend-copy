import { collection } from "../../models/collection.model.js";
import { redis } from "../../index.js";
import pool from "../../utils/postgresConnection.utils.js";
import { FindCourseReferralAmount } from "./findCourseAmount.js";
const acceptRejectReferralCode = async (req, res) => {
    const { emailId, referralCodeAcceptedOrRejected, status, dateReferred } = req.body;
    const user = await collection.findOne({ email: emailId });
    if (!user) {
        res.status(404).json({
            message: "User not found"
        });
        return;
    }
    const referCode = user.refercode;
    const useNumber = user.usenumber;
    const referCodeList = await redis.get(referCode);
    if (!referCodeList) {
        res.status(404).json({
            message: "No active referrals present for the user",
        });
        return;
    }
    const parsedReferCodeList = JSON.parse(referCodeList);
    const referralInfo = parsedReferCodeList.find(referralVal => referralVal.dateReferred == dateReferred);
    const amountIncrement = FindCourseReferralAmount.findAmount({ courseList: referralInfo?.coursesBought ?? [], additionalCourses: referralInfo?.additionalCourses ?? [] });
    if (status == true) {
        const referredUser = await collection.find({ refercode: referralCodeAcceptedOrRejected });
        if (!referredUser || referredUser.length == 0) {
            res.status(404).json({
                message: "Referred user does not exist",
            });
            return;
        }
        referredUser[0].referrer_refer_code = referCode;
        await referredUser[0].save();
        user.usenumber = useNumber - 1;
        await user.save();
        const query = `SELECT * FROM user_referral_schema WHERE refer_code = $1`;
        try {
            const response = await pool.query(query, [referCode]);
            if (response.rowCount == 0) {
                const insertQuery = `INSERT INTO user_referral_schema (refer_code, wallet_balance, number_of_referrals, referral_given_list) VALUES ($1, $2, $3, $4);`;
                const recordValue = [{
                        referCode: referralCodeAcceptedOrRejected,
                        date_of_referral: new Date().toISOString(),
                        amountIncrement: amountIncrement
                    }];
                const insertResponse = await pool.query(insertQuery, [referCode, amountIncrement, 1, JSON.stringify(recordValue)]);
            }
            else {
                const prevBalance = response.rows[0].wallet_balance;
                const numberOfReferrals = response.rows[0].number_of_referrals;
                const referralsGiven = response.rows[0].referral_given_list;
                const newBalance = parseInt(prevBalance) + amountIncrement;
                const newNumberReferrals = numberOfReferrals + 1;
                const newRecord = {
                    referCode: referralCodeAcceptedOrRejected,
                    date_of_referral: new Date().toISOString(),
                    amountIncrement: amountIncrement
                };
                const updatedList = [...JSON.parse(referralsGiven), newRecord];
                const updateQuery = `UPDATE user_referral_schema SET wallet_balance = $1, number_of_referrals = $2, referral_given_list = $3 WHERE refer_code = $4;`;
                const updateResponse = await pool.query(updateQuery, [newBalance, newNumberReferrals, JSON.stringify(updatedList), referCode]);
            }
            const presenceCheckQuery = `SELECT * FROM referral_money_tracker WHERE referral_giver_refer_code = $1`;
            const presenceCheckResponse = await pool.query(presenceCheckQuery, [referCode]);
            if (presenceCheckResponse.rowCount == 0) {
                const checkRedisExistence = await redis.get(`MoneyTransferLogs`);
                if (!checkRedisExistence) {
                    const newlyConfirmedLogs = [
                        {
                            referCode: referCode,
                            date_confirmed: new Date().toISOString(),
                            emailId: emailId
                        }
                    ];
                    await redis.set(`MoneyTransferLogs`, JSON.stringify(newlyConfirmedLogs));
                }
                const parsedRedisExistence = JSON.parse(checkRedisExistence ?? "");
                const alreadyPresentUser = parsedRedisExistence.find((user) => user.referCode == referCode);
                if (!alreadyPresentUser) {
                    parsedRedisExistence.push({
                        referCode: referCode,
                        date_confirmed: new Date().toISOString(),
                        emailId: emailId
                    });
                    await redis.set(`MoneyTransferLogs`, JSON.stringify(parsedRedisExistence));
                }
            }
        }
        catch (error) {
            res.status(500).json({
                message: "Error updating referral information",
            });
            console.log(error);
            return;
        }
    }
    else if (status == false) {
        console.log("User refused to accept his referral");
    }
    else {
        res.status(400).json({
            message: "Incorrect status provided",
        });
        return;
    }
    if (parsedReferCodeList.length == 1) {
        await redis.del(referCode);
    }
    else {
        const filteredList = parsedReferCodeList.filter((referrals) => {
            return referrals.refercode != referralCodeAcceptedOrRejected && referrals.dateReferred != dateReferred;
        });
        await redis.set(referCode, JSON.stringify(filteredList), 'EX', 30 * 24 * 60 * 60);
    }
    const referralList = await redis.get(referCode);
    if (!referralList) {
        res.status(200).json({
            referralList: [],
            messageList: "Referral Code status updated successfully",
            status: status == true ? "accepted" : "rejected",
            referralCodeAcceptedOrRejected: referralCodeAcceptedOrRejected
        });
        return;
    }
    res.status(200).json({
        referralList: JSON.parse(referralList),
        message: "Referral Code status updated succesfully",
        referralCodeAcceptedOrRejected: referralCodeAcceptedOrRejected,
        status: status == true ? "accepted" : "rejected",
    });
};
export default acceptRejectReferralCode;
