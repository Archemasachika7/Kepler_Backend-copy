import Router from "express";
import getGmailAuthCode from "../GmailAuthControllers/GetGmailAuth.controller.js";
import gmailAuthTokenReceiver from "../GmailAuthControllers/GmailAuthCodeReceive.controller.js";
const router = Router();
router.route("/getGmailAuth").get(getGmailAuthCode);
router.route("/OAuth2Callback").get(gmailAuthTokenReceiver);
export default router;
