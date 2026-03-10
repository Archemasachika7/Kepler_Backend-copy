import { WebSocketServer } from "ws";
import { httpServer, JWT_ACCESS_SECRET, userSockets } from "../index.js";
import talkcollection from "../models/talkcollection.model.js";
import jwt from "jsonwebtoken";
const webSocketControl = async () => {
    const wss = new WebSocketServer({
        server: httpServer,
    });
    wss.on("connection", async (ws, req) => {
        console.log("Connected");
        try {
            const params = new URL(req.url, "http://x").searchParams;
            const token = params.get("token");
            if (token) {
                const user = jwt.verify(token, JWT_ACCESS_SECRET);
                if (user) {
                    const email = user.email;
                    ws.email = email;
                    if (!userSockets.has(email)) {
                        userSockets.set(email, new Set());
                    }
                    userSockets.get(email).add(ws);
                }
            }
        }
        catch (error) {
            console.log("User is not logged in", error);
        }
        ws.on("message", async (message) => {
            const data = JSON.parse(message);
            if (data.format == "GroupChat") {
                const savedData = new talkcollection({
                    group_name: data.group_name,
                    name: data.name,
                    email: data.email,
                    message: data.message,
                    image: data.image,
                    image_title: data.image_title,
                    date: data.date,
                });
                wss.clients.forEach((client) => {
                    if (client.readyState == ws.OPEN) {
                        client.send(JSON.stringify(savedData));
                    }
                });
                await savedData.save();
            }
            else if (data.format == 'commentPost') {
                const savedData = new talkcollection({
                    group_name: "codingComment",
                    problem_name: data.problem_name,
                    name: data.name,
                    email: data.email,
                    message: data.message,
                    date: data.date
                });
                wss.clients.forEach((client) => {
                    if (client.readyState === ws.OPEN) {
                        client.send(JSON.stringify(savedData));
                    }
                });
                await savedData.save();
            }
            else {
                console.log("Unknown message type", data);
            }
        });
        ws.on("close", () => {
            console.log("Disconnected");
            if (ws.email && userSockets.has(ws.email)) {
                const set = userSockets.get(ws.email);
                set?.delete(ws);
                if (set?.size == 0) {
                    userSockets.delete(ws.email);
                }
            }
        });
    });
};
export default webSocketControl;
