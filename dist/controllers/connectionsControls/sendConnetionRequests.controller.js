import pool from "../../utils/postgresConnection.utils";
import { userSockets } from "../..";
import { WebSocket } from "ws";
const sendConnectionRequestsController = async (req, res) => {
    const { senderEmail, receiverEmail } = req.body;
    try {
        const insertQuery = `INSERT INTO connectionrequestschema (senderemail, receiveremail) VALUES ($1, $2)`;
        const values = [senderEmail, receiverEmail];
        await pool.query(insertQuery, values);
        if (userSockets.has(receiverEmail)) {
            const sockets = userSockets.get(receiverEmail);
            sockets?.forEach((socket) => {
                if (socket.readyState == WebSocket.OPEN) {
                    socket.send(JSON.stringify({
                        type: 'NEW_CONNECTION_REQUEST',
                        senderEmail: senderEmail
                    }));
                }
            });
        }
        res.status(200).json({
            message: "Send Connection Request",
            receiverEmail: receiverEmail
        });
    }
    catch (error) {
        console.log("Error in sending the connection request", error);
        res.status(500).json({
            message: "Failed to send request"
        });
    }
};
export default sendConnectionRequestsController;
