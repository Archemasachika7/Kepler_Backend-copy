import { google } from "googleapis";
import config from "../config.js";
const OAuth2Client = new google.auth.OAuth2(config.GMAIL_CLIENT_ID, config.GMAIL_CLIENT_SECRET, config.GMAIL_REDIRECT_URI);
OAuth2Client.setCredentials({
    refresh_token: config.GMAIL_REFRESH_TOKEN,
});
const gmail = google.gmail({
    version: 'v1',
    auth: OAuth2Client,
});
export default gmail;
