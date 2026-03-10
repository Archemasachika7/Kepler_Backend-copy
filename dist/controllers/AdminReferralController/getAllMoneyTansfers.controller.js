import pool from "../../utils/postgresConnection.utils.js";
import { redis } from "../../index.js";
import { collection } from "../../models/collection.model.js";
const getAllReferralMoney = async (req, res) => {
    try {
        const responseData = [];
        const newlyConfirmedUsersRaw = await redis.get("MoneyTransferLogs");
        const existingUsers = new Set();
        const user_referral_schema_calling_query = `SELECT * FROM user_referral_schema`;
        const user_referral_schema_information = await pool.query(user_referral_schema_calling_query);
        if (newlyConfirmedUsersRaw) {
            const parsedNewlyConfirmedUsers = JSON.parse(newlyConfirmedUsersRaw ?? "");
            for (const user of parsedNewlyConfirmedUsers) {
                existingUsers.add(user.referCode);
                const newlyConfimedUsersResponse = user_referral_schema_information.rows.find((userInformation) => {
                    return userInformation.refer_code == user.referCode;
                });
                responseData.push({
                    referral_giver_refer_code: user.referCode,
                    referral_giver_email: user.emailId,
                    referral_money_given_date: user.date_confirmed,
                    referral_giver_upi_id: newlyConfimedUsersResponse?.upi_id,
                    referral_giver_account_number: newlyConfimedUsersResponse?.account_number,
                    referral_giver_ifsc_code: newlyConfimedUsersResponse?.ifse_code,
                    referral_giver_account_name: newlyConfimedUsersResponse?.account_holder_name,
                    referral_giver_bank_name: newlyConfimedUsersResponse?.bank_name,
                    money_given_status: false,
                    wallet_balance: newlyConfimedUsersResponse?.wallet_balance,
                    toChange: false
                });
            }
        }
        const referral_money_query = `SELECT * FROM referral_money_tracker ORDER BY referral_money_given_date DESC`;
        const referral_money_information = await pool.query(referral_money_query);
        const oldConfirmedUsers = user_referral_schema_information.rows.filter((userInformation) => {
            return userInformation.wallet_balance > 0;
        });
        oldConfirmedUsers.forEach(async (oldUser) => {
            if (existingUsers.has(oldUser.refer_code)) {
                return;
            }
            console.log(oldUser);
            const referralMoneyInformationResponse = referral_money_information.rows.filter((referralMoneyInformation) => {
                return (referralMoneyInformation.referral_giver_refer_code == oldUser.refer_code);
            });
            const lastApprovedDate = referralMoneyInformationResponse[0].referral_money_given_date;
            const emailID = await collection.findOne({ refercode: oldUser.refer_code });
            responseData.push({
                referral_giver_refer_code: oldUser.refer_code,
                referral_giver_email: emailID?.email ?? "",
                referral_money_given_date: lastApprovedDate,
                referral_giver_upi_id: oldUser.upi_id,
                referral_giver_account_number: oldUser.account_number,
                referral_giver_ifsc_code: oldUser.ifse_code,
                referral_giver_account_name: oldUser.account_holder_name,
                referral_giver_bank_name: oldUser.bank_name,
                money_given_status: false,
                wallet_balance: oldUser.wallet_balance,
                toChange: true,
            });
        });
        referral_money_information.rows.forEach((referral_money_information) => {
            const userDetails = user_referral_schema_information.rows.find((user) => {
                return (user.refer_code ==
                    referral_money_information.referral_giver_refer_code);
            });
            if (userDetails.wallet_balance > 0) {
                return;
            }
            responseData.push({
                referral_giver_refer_code: referral_money_information.referral_giver_refer_code,
                referral_giver_email: referral_money_information.referral_giver_email,
                referral_money_given_date: referral_money_information.referral_money_given_date,
                referral_amount: referral_money_information.amount_given,
                referral_giver_upi_id: userDetails.upi_id,
                referral_giver_account_number: userDetails.account_number,
                referral_giver_ifsc_code: userDetails.ifse_code,
                referral_giver_account_name: userDetails.account_holder_name,
                referral_giver_bank_name: userDetails.bank_name,
                money_given_status: true,
                wallet_balance: userDetails.wallet_balance,
                toChange: false,
            });
        });
        res.status(200).json({
            responseData: responseData,
            message: "Details fetched successfully",
        });
    }
    catch (error) {
        console.log("Internal Server Error");
        console.log(error);
    }
};
export default getAllReferralMoney;
