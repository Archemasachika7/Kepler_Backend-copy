import { Router } from "express";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
const frontendUrl = process.env.FRONTEND_URL;
const router = Router();
router.route("/google").get(passport.authenticate("google", { scope: ["profile", "email"] }));
router.route("/google/callback").get(passport.authenticate("google", { session: false, failureRedirect: "/" }), (req, res) => {
    const googleAccessToken = req.user.accessToken;
    const userInfo = req.user.userInfo;
    res.redirect(`${frontendUrl}/authlogin/${userInfo.email}`);
});
export default router;
