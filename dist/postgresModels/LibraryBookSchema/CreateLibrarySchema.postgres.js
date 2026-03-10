import pool from "../../utils/postgresConnection.utils";
(async () => {
    const query = `CREATE TABLE IF NOT EXISTS library (
        course VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        url VARCHAR(255) NOT NULL,
        PRIMARY KEY (course, title, url)
    )`;
    try {
        const response = await pool.query(query);
        console.log("Library Schema created successfully", response);
        const createQueryIndex = `CREATE INDEX IF NOT EXISTS idx_library_course ON library (course)`;
        await pool.query(createQueryIndex);
        console.log("Index on course column created successfully");
    }
    catch (error) {
        console.error("Error creating Library Schema", error);
    }
})();
