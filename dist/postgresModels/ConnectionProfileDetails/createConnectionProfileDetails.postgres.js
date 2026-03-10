import pool from "../../utils/postgresConnection.utils.js";
(async () => {
    const query = `CREATE TABLE IF NOT EXISTS connectionProfileSchema (
        email VARCHAR(255) NOT NULL PRIMARY KEY,
        headline VARCHAR(255),
        bio TEXT,
        githuburl VARCHAR(255),
        linkedinurl VARCHAR(255),
        portfoliourl VARCHAR(255),
        techstack TEXT[],
        skills TEXT[],
        projects JSONB,
        isOpenToWork BOOLEAN,
        avatar VARCHAR(255),
        endorsements INT DEFAULT 0
    )`;
    try {
        const response = await pool.query(query);
        console.log("Connection Profile table created successfully", response);
    }
    catch (error) {
        console.error("Error in creating the Connection Profile table", error);
    }
})();
