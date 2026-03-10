import pool from "../../../utils/postgresConnection.utils";
const getConnectionChat = async (req, res) => {
    const { senderEmail, receiverEmail } = req.body;
    const query = `SELECT * FROM (
                    SELECT * FROM kepconchats WHERE (sender = $1 AND receiver = $2) OR (sender = $2 AND receiver = $1)
                    ORDER BY date DESC 
                    LIMIT 100
                ) chat
                ORDER BY date ASC;`;
    try {
        const response = await pool.query(query, [senderEmail, receiverEmail]);
        if (response.rows.length != 0) {
            res.status(200).json({
                chatMessages: response.rows,
                message: "Chats found successfully",
            });
            return;
        }
        res.status(200).json({
            chatMessages: [],
            message: "No chat exists for this user yet"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error,
        });
    }
};
export default getConnectionChat;
