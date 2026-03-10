import { sendRegistrationEmail } from "../../utils/mailsend.utils.js";
import pool from "../../utils/postgresConnection.utils.js";
import { redis } from "../../index.js";
import { collection } from "../../models/collection.model.js";
const confirmReferralMoneyTransfer = async (req, res) => {
    const { referral_giver_refer_code, money_transfer_status, referral_amount } = req.body;
    const getReferCode = await collection.findOne({ refercode: referral_giver_refer_code });
    if (!getReferCode) {
        res.status(400).json({
            message: "No user exist with this refer code"
        });
        return;
    }
    const referral_giver_emailId = getReferCode?.email;
    const insertQuery = `INSERT INTO referral_money_tracker (referral_giver_refer_code, referral_giver_email, referral_money_given_date, money_given_status, amount_given) VALUES ($1, $2, $3, $4, $5);`;
    try {
        const response = await pool.query(insertQuery, [referral_giver_refer_code, referral_giver_emailId, new Date().toISOString(), money_transfer_status, referral_amount]);
        const checkRedisExistence = await redis.get(`MoneyTransferLogs`);
        if (checkRedisExistence) {
            const parsedRedisExistence = JSON.parse(checkRedisExistence ?? "");
            const alreadyPresentUser = parsedRedisExistence.find((user) => user.referCode == referral_giver_refer_code);
            if (alreadyPresentUser) {
                const updatedLogs = parsedRedisExistence.filter((user) => {
                    return user.referCode != referral_giver_refer_code;
                });
                if (updatedLogs.length == 0) {
                    await redis.del(`MoneyTransferLogs`);
                }
                else {
                    await redis.set('MoneyTransferLogs', JSON.stringify(updatedLogs));
                }
            }
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        });
        console.log(error);
        return;
    }
    if (money_transfer_status == true) {
        await sendRegistrationEmail(referral_giver_emailId ?? "", "kepler.xxiib.cygnus@gmail.com", "Referral Money Transfer Confirmed", `The money transfer for the referrals that you provided to our other students has been confirmed successfully. Please raise a ticket if you do not see the amount in your account within 3-5 buisness days.`);
        const updateWalletQuery = `UPDATE user_referral_schema SET wallet_balance = wallet_balance - $1 WHERE refer_code = $2;`;
        try {
            const updateWalletResponse = await pool.query(updateWalletQuery, [referral_amount, referral_giver_refer_code]);
        }
        catch (error) {
            console.log("Error updating wallet balance after confirming money transfer", error);
        }
        res.status(200).json({
            message: "Money transfer confirmed successfully"
        });
    }
    else {
        res.status(400).json({
            message: "Money transfer failed. Please try again later."
        });
    }
};
export default confirmReferralMoneyTransfer;
