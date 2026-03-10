import { Request, Response } from "express";
import { OAuth2Client } from "../index";

const gmailAuthTokenReceiver = async(req: Request, res: Response) => {
    const code = req.query.code
    if(!code){
        res.send("No code received");
        return;
    }
    try {
        const { tokens } = await OAuth2Client.getToken(code);
        res.send(`
            <h3>Tokens Received</h3>
            <p>Tokens have been received successfully. Store them securely.</p>
        `);
    }
    catch(err) {
        res.send("Error receiving tokens");
    }
}

export default gmailAuthTokenReceiver;