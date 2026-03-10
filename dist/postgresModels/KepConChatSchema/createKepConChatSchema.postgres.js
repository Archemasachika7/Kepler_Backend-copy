import pool from "../../utils/postgresConnection.utils.js";
(async () => {
    const query = `CREATE TABLE IF NOT EXISTS kepconchats (
        sender VARCHAR(255),
        receiver VARCHAR(255),
        chatmessage VARCHAR(255),
        date VARCHAR(255)
    );`;
    try {
        const response = await pool.query(query);
        console.log("KepCon Chats table created successfully");
    }
    catch (error) {
        console.log("Failed to create the KepCon chats storage", error);
    }
})();
