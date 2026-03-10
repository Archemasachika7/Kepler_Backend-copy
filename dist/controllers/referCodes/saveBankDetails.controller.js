import { collection } from "../../models/collection.model.js";
import pool from "../../utils/postgresConnection.utils.js";
const saveReferralBankDetails = async (req, res) => {
    const { emailId, accountName, accountId, ifsc_code, branch, bank_name, upi_id } = req.body;
    const referCode = await collection.find({ email: emailId }).select('referCode');
    try {
        const query = `UPDATE user_referral_schema SET account_number = $1, ifsc_code = $2, account_holder_name = $3, branch = $4, bank_name = $5, upi_id = $6 WHERE refer_code = $7`;
        const values = [accountId, ifsc_code, accountName, branch, bank_name, upi_id, referCode];
        const response = await pool.query(query, values);
        res.status(200).json({
            message: "User bank details updated successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
export default saveReferralBankDetails;
