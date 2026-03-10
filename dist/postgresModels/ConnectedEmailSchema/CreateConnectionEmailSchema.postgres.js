import pool from "../../utils/postgresConnection.utils.js";
(async () => {
    const query = `CREATE TABLE IF NOT EXISTS connectedEmailSchema (
        owneremail VARCHAR(255) NOT NULL,
        connectedemail VARCHAR(255) NOT NULL
    )`;
    try {
        const response = await pool.query(query);
        console.log("Connection Emails Table connectedEmailSchema is created successfully ", response);
    }
    catch (error) {
        console.log("Failed to create the connection emails table ", error);
    }
})();
