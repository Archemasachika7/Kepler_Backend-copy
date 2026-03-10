import pool from "../../utils/postgresConnection.utils";
(async () => {
    const query = `CREATE TABLE IF NOT EXISTS visits(
        id BIGSERIAL PRIMARY KEY,
        ip_address VARCHAR(45) NOT NULL,
        country VARCHAR(50),
        city VARCHAR(50),
        user_agent TEXT,
        visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
    );`;
    try {
        const response = await pool.query(query);
        console.log("Visited Schema created successfully", response);
        const indexQuery = `CREATE INDEX idx_ip_address ON visits (ip_address);`;
        await pool.query(indexQuery);
        console.log("Index on the primary key created successfully.");
    }
    catch (error) {
        console.log("Failed to create the Visits schema");
    }
})();
