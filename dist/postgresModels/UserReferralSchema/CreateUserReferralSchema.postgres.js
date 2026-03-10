import pool from "../../utils/postgresConnection.utils.js";
(async () => {
    const tableQuery = `CREATE TABLE IF NOT EXISTS user_referral_schema (
        refer_code VARCHAR(255) NOT NULL PRIMARY KEY,
        wallet_balance INT NOT NULL DEFAULT 0,
        number_of_referrals INT NOT NULL DEFAULT 0,
        referral_given_list TEXT NOT NULL DEFAULT '[]',
        account_number VARCHAR(255) NOT NULL DEFAULT '',
        ifsc_code VARCHAR(255) NOT NULL DEFAULT '',
        account_holder_name VARCHAR(255) NOT NULL DEFAULT '',
        branch VARCHAR(255) NOT NULL DEFAULT '',
        upi_id VARCHAR(255) NOT NULL DEFAULT '',
        bank_name VARCHAR(255) NOT NULL DEFAULT ''
    );`;
    try {
        const tableResponse = await pool.query(tableQuery);
        console.log("User Referral Schema created successfully", tableResponse);
    }
    catch (error) {
        console.error("Error creating User Referral Schema", error);
    }
})();
