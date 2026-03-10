import pool from "../../utils/postgresConnection.utils";
const createHistorySchema = async () => {
    const query = `CREATE TABLE IF NOT EXISTS History (
        user_id VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL PRIMARY KEY INDEX,
        logintime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        logouttime TIMESTAMP DEFAULT NULL
        status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
        details TEXT,
        locations TEXT,   
    )`;
    try {
        const response = await pool.query(query);
        console.log("History Schema created successfully", response);
    }
    catch (error) {
        console.error("Error creating History Schema", error);
    }
};
export default createHistorySchema;
