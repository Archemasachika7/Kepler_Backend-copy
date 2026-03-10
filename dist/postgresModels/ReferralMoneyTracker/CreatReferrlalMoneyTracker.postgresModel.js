import pool from "../../utils/postgresConnection.utils.js";
(async () => {
    const query = `CREATE TABLE IF NOT EXISTS referral_money_tracker (
        referral_giver_refer_code VARCHAR(255) NOT NULL,
        referral_giver_email VARCHAR(255) NOT NULL,
        referral_money_given_date VARCHAR(255) NOT NULL,
        money_given_status VARCHAR(255) NOT NULL,
        amount_given VARCHAR(255)
    );`;
    try {
        const response = await pool.query(query);
        console.log("Referral Money Tracker Schema created successfully", response);
    }
    catch (error) {
        console.error("Error creating Referral Money Tracker Schema", error);
    }
})();
