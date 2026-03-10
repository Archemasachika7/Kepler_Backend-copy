import { collection } from "../../models/collection.model.js";
import pool from "../../utils/postgresConnection.utils.js";
import getUserInformationFromReferCode from "./GetUserInfoFromReferCode.controller.js";
const getAllReferralsGiven = async (req, res) => {
    const emailId = req.body.email;
    res.status(200);
    res.setHeader("Content-Type", "application/x-ndjson");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Connection", "keep-alive");
    const send = (obj) => {
        res.write(JSON.stringify(obj) + '\n');
    };
    const responseData = [];
    try {
        const referral_giver = await collection.findOne({ email: emailId }).select('refercode');
        const query = `SELECT * FROM user_referral_schema WHERE refer_code = $1`;
        const referral_giver_info = await pool.query(query, [referral_giver?.refercode]);
        const referral_takers_raw = referral_giver_info.rows[0]?.referral_given_list;
        if (!referral_takers_raw) {
            res.status(206).json({
                message: "No referrals found for this user",
                responseData: {},
                referralCount: 0
            });
            return;
        }
        const referral_takers = JSON.parse(referral_takers_raw);
        if (!referral_takers || referral_takers.length == 0) {
            res.status(206).json({
                message: "No referrals found for this user",
                responseData: {},
                referralCount: 0
            });
            return;
        }
        send({
            type: "start",
            message: "Streaming referral details one by one",
            total: referral_takers.length,
            walletBalance: referral_giver_info.rows[0].wallet_balance,
        });
        const wallet_balance = referral_giver_info.rows[0].wallet_balance;
        let count = 0;
        for (const referredUser of [...referral_takers].reverse()) {
            const referralInfo = await getUserInformationFromReferCode(referredUser.referCode);
            const amountIncrement = referredUser.amountIncrement;
            if (!referralInfo) {
                continue;
            }
            let paidAmount = false;
            if (count == wallet_balance) {
                paidAmount = true;
            }
            else {
                count = count + amountIncrement;
            }
            Object.assign(referralInfo, {
                dateReferred: referredUser.date_of_referral,
                status: "confirmed",
                amount: amountIncrement,
                paidAmount: paidAmount
            });
            responseData.push(referralInfo);
            send({
                type: "Connection",
                responseData: referralInfo,
                email: referredUser.email,
                message: "Referral details fetched for one user",
                status: "confirmed"
            });
        }
        send({
            type: "end",
            message: "Completed streaming all referral details",
            total: responseData.length,
        });
        res.end();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        });
        res.end();
    }
};
export default getAllReferralsGiven;
