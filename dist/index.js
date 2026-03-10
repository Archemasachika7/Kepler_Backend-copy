import express from "express";
import cors from "cors";
import apiroute from "./routers/query.route.js";
import userrouter from "./routers/users.routes.js";
import talkrouter from "./routers/talk.route.js";
import libraryrouter from "./routers/library.route.js";
import googleAuthRouter from "./routers/googleAuthRoute.js";
import { collection } from "./models/collection.model.js";
import numberrouter from "./routers/number.route.js";
import removetoken from "./controllers/logout.controller.js";
import liveuser from "./controllers/extras/LiveUser.controller.js";
import historyuser from "./controllers/extras/Historyuser.controller.js";
import webSocketControl from "./utils/Websocket.utils.js";
import cookieParser from "cookie-parser";
import loginrouter from "./routers/login.route.js";
import passport from "passport";
import paymentRouter from "./routers/paymentRoutes.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import logger from "./utils/winston_logger.js";
import checkAccessToken from "./middlewares/checkAccessTokens.js";
import refreshAuthRouter from "./routers/authRefresh.route.js";
import razorpayRouter from "./routers/razorpay.route.js";
import Razorpay from "razorpay";
import { Redis } from "ioredis";
import checkValidity from "./middlewares/checkValidity.utils.js";
import { Queue } from "bullmq";
import ProblemsRouter from "./routers/problems.route.js";
import config from "./config.js";
import gmailAuthRouter from "./routers/GmailAuthRouter.routes.js";
import { google } from "googleapis";
import referCodeRouter from "./routers/ReferCodeRouter.route.js";
import checkTableExists from "./postgresModels/checkTableExists.postgres.js";
import connectionRouter from "./routers/ConnectionRouter.routes.js";
import ReferralMoneyTransfer from "./routers/ReferralMoneyTracker.route.js";
import PlayListRouter from "./routers/Playlist.route.js";
import AdminRouter from "./routers/AdminRouter.route.js";
const app = express();
app.set("trust proxy", 1);
const corsConfig = {
    origin: [
        "https://kepler-22b.vercel.app",
        "http://localhost:3001",
        "https://8ppzcvlk-3001.inc1.devtunnels.ms",
    ],
    credentials: true,
};
app.options("*", cors(corsConfig));
app.use(cors(corsConfig));
// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 1000,
//     message: {
//       status: 429,
//       error: "Rate limit exceeded",
//       retryAfter: "Try again in a few minutes.",
//     },
//     handler: (req, res) => {
//       res.status(429).json({
//         error:
//           "Rate Limit Exceeded from this client. Please try after some time",
//       });
//     },
//     legacyHeaders: false,
//     skip: (req) => req.method == "OPTIONS",
//   })
// );
app.use(cookieParser());
app.use(express.json());
app.set("view-engine", "html");
app.use((req, res, next) => {
    if (req.method == "OPTIONS") {
        res.status(202).send("Options header is passed by default");
    }
    else {
        next();
    }
});
export const JWT_ACCESS_SECRET = config.JWT_ACCESS_SECRET;
export const JWT_REFRESH_SECRET = config.JWT_REFRESH_SECRET;
export const RAZORPAY_KEY_ID = config.RAZORPAY_KEY_ID;
export const RAZORPAY_SECRET = config.RAZORPAY_SECRET;
export const userSockets = new Map();
export const OAuth2Client = new google.auth.OAuth2(config.GMAIL_CLIENT_ID, config.GMAIL_CLIENT_SECRET, config.GMAIL_REDIRECT_URI);
export const codeRunnerIP = '13.200.236.32';
const port = config.PORT || 8000;
const hostname = "0.0.0.0";
export const redis = new Redis(config.REDIS_URL, {
    maxRetriesPerRequest: null
});
export const scheduler = new Queue('emailQueue', {
    connection: redis
});
import("./utils/connection.utils.js");
import("./utils/PaymentEmails/sendCourseDeadlineMail.utils.js");
import("./utils/postgresConnection.utils.js");
import("./utils/nodecron.js");
passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID || "",
    clientSecret: config.GOOGLE_CLIENT_SECRET || "",
    callbackURL: config.GOOGLE_CALLBACK_URL ||
        `https://8ppzcvlk-8000.inc1.devtunnels.ms/auth/google/callback`,
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    const userInfo = {
        id: profile.id,
        displayName: profile.displayName,
        email: profile.emails ? profile.emails[0].value : "",
    };
    return done(null, { accessToken, userInfo });
}));
app.use(passport.initialize());
export const razorpay = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_SECRET,
});
(async () => {
    if (await checkTableExists("library") == false) {
        await import("./postgresModels/LibraryBookSchema/CreateLibrarySchema.postgres.js");
    }
    if (await checkTableExists("connectionProfileSchema") == false) {
        await import("./postgresModels/ConnectionProfileDetails/createConnectionProfileDetails.postgres.js");
    }
    if (await checkTableExists("connectedEmailSchema") == false) {
        await import("./postgresModels/ConnectedEmailSchema/CreateConnectionEmailSchema.postgres.js");
    }
    if (await checkTableExists("connectionRequestSchema") == false) {
        await import("./postgresModels/ConnectedEmailSchema/CreateConnectionRequestSchema.postgres.js");
    }
    if (await checkTableExists("kepconchats") == false) {
        await import("./postgresModels/KepConChatSchema/createKepConChatSchema.postgres.js");
    }
    if (await checkTableExists("user_referral_schema") == false) {
        await import("./postgresModels/UserReferralSchema/CreateUserReferralSchema.postgres.js");
    }
    if (await checkTableExists("referral_money_tracker") == false) {
        await import("./postgresModels/ReferralMoneyTracker/CreatReferrlalMoneyTracker.postgresModel.js");
    }
})();
app.use("/gmailAuth", gmailAuthRouter);
app.use("/auth", googleAuthRouter);
app.use("/authRefreshToken", refreshAuthRouter);
app.use("/login", loginrouter);
app.use("/users", userrouter);
app.use("/api", apiroute);
app.post("/logout", removetoken);
// Protected Routes
app.use(checkAccessToken);
app.get("/liveusers", liveuser);
app.get("/historyusers", historyuser);
app.use("/problems", ProblemsRouter);
app.use("/razorpay", razorpayRouter);
app.use("/referCode", referCodeRouter);
app.use(checkValidity);
app.use("/library", libraryrouter);
app.use("/talks", talkrouter);
app.use("/number", numberrouter);
app.use("/payment", paymentRouter);
app.use("/connections", connectionRouter);
app.use("/playlist", PlayListRouter);
app.use("/admins", AdminRouter);
app.use("/referralMoneyTracker", ReferralMoneyTransfer);
app.post("/removeprofile", async (req, res) => {
    const mail = await collection.deleteOne({ email: req.body.email });
    res.status(200).send("Deleted");
});
export const httpServer = app.listen(port, hostname, () => {
    logger.info(`Server Started Successfully at http://${hostname}/${port}`);
    console.log(`http://${hostname}:${port}`);
});
webSocketControl();
