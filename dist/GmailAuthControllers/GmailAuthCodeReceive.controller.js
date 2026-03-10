import { OAuth2Client } from "../index.js";
import { google } from "googleapis";
const gmailAuthTokenReceiver = async (req, res) => {
    const code = req.query.code;
    if (!code) {
        res.send("No code received");
        return;
    }
    try {
        const { tokens } = await OAuth2Client.getToken(code);
        OAuth2Client.setCredentials(tokens);
        const oauth2 = google.oauth2({
            auth: OAuth2Client,
            version: "v2",
        });
        const userInfo = await oauth2.userinfo.get();
        if (userInfo.data.email != "hossainfarshid@gmail.com" && userInfo.data.email != "kepler.xxiib.cygnus@gmail.com") {
            res.status(401).json({
                message: "UnAuthorized"
            });
            return;
        }
        console.log("Tokens received ", tokens);
        res.send(`
            <h3>Tokens Received</h3>
            <p>Access Token: ${tokens.access_token}</p>
            <p>Refresh Token: ${tokens.refresh_token}</p>
        `);
    }
    catch (err) {
        console.log(err);
        res.send("Error receiving tokens");
    }
};
export default gmailAuthTokenReceiver;
