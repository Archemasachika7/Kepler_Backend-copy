import dotenv from "dotenv";
dotenv.config();
;
const config = {
    SERVER: process.env.SERVER,
    DATABASE: process.env.DATABASE,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_SECRET: process.env.RAZORPAY_SECRET,
    PORT: process.env.PORT,
    REDIS_URL: process.env.REDIS_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
    BREVO_API_KEY: process.env.BREVO_API_KEY,
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASS: process.env.GMAIL_PASS,
    GMAIL_CLIENT_ID: process.env.GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET: process.env.GMAIL_CLIENT_SECRET,
    GMAIL_REDIRECT_URI: process.env.GMAIL_REDIRECT_URI,
    GMAIL_REFRESH_TOKEN: process.env.GMAIL_REFRESH_TOKEN
};
export default config;
