import pool from "../../utils/postgresConnection.utils.js";
import { userSockets } from "../../index.js";
const acceptConnectionRequestController = async (req, res) => {
    const { senderEmail, receiverEmail, status } = req.body;
    try {
        if (status !== true && status !== false) {
            res.status(400).json({
                message: "Invalid status value"
            });
            return;
        }
        else if (status === true) {
            const insertConnectedQuery = `INSERT INTO connectedemailschema (owneremail, connectedemail) VALUES ($1, $2);`;
            await pool.query(insertConnectedQuery, [receiverEmail, senderEmail]);
            await pool.query(insertConnectedQuery, [senderEmail, receiverEmail]);
            userSockets.get(senderEmail)?.forEach((socket) => {
                if (socket.readyState == socket.OPEN) {
                    socket.send(JSON.stringify({
                        type: "CONNECTION_REQUEST_ACCEPTED",
                        connectedEmail: receiverEmail
                    }));
                }
            });
            userSockets.get(receiverEmail)?.forEach((socket) => {
                if (socket.readyState == socket.OPEN) {
                    socket.send(JSON.stringify({
                        type: "CONNECTION_REQUEST_ACCEPTED",
                        connectedEmail: senderEmail
                    }));
                }
            });
            const query = `DELETE FROM connectionrequestschema WHERE senderemail = $1 AND receiveremail = $2`;
            const values = [senderEmail, receiverEmail];
            await pool.query(query, values);
            res.status(200).json({
                message: "Connection request accepted successfully"
            });
            return;
        }
        else if (status == false) {
            const query = `DELETE FROM connectionrequestschema WHERE senderemail = $1 AND receiveremail = $2`;
            const values = [senderEmail, receiverEmail];
            await pool.query(query, values);
            res.status(200).json({
                message: "Connection request rejected successfully"
            });
            return;
        }
    }
    catch (error) {
        console.log("Error in accepting the connection request", error);
        res.status(500).json({
            message: "Internal server error while accepting the connection request"
        });
    }
};
export default acceptConnectionRequestController;
