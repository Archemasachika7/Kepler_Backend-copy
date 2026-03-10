import pool from "../../../utils/postgresConnection.utils";
import { userSockets } from "../../..";
import { WebSocket } from "ws";
const sendChats = async (req, res) => {
    const { senderEmail, receiverEmail, messageBody } = req.body;
    const date = new Date().toLocaleDateString("en-IN");
    const query = `INSERT INTO kepconchats (sender, receiver, chatmessage, date) VALUES ($1, $2, $3, $4);`;
    try {
        const response = await pool.query(query, [senderEmail, receiverEmail, messageBody, date]);
        if (userSockets.has(receiverEmail)) {
            const sockets = userSockets.get(receiverEmail);
            sockets?.forEach((socket) => {
                if (socket.readyState == WebSocket.OPEN) {
                    socket.send(JSON.stringify({
                        type: "PERSONAL_CONNECTION_CHAT",
                        sender: senderEmail,
                        receiver: receiverEmail,
                        messageBody: messageBody,
                        date: date,
                    }));
                }
            });
        }
        res.status(200).json({
            message: "Chat Message delivered successfully"
        });
    }
    catch (error) {
        console.log("Error in sending personal message", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
export default sendChats;
