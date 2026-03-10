import pool from "../../utils/postgresConnection.utils.js";
(async () => {
    const query = `CREATE TABLE IF NOT EXISTS connectionrequestschema (
        senderemail VARCHAR(255) NOT NULL,
        receiveremail VARCHAR(255) NOT NULL
    )`;
    try {
        const response = await pool.query(query);
        console.log("Connection Request Table connectionrequestschema is created successfully", response);
    }
    catch (error) {
        console.log("Failed to create the connection request table", error);
    }
})();
