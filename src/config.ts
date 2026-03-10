import dotenv from "dotenv"
dotenv.config();

interface envVariablesInterface { 
    JWT_ACCESS_SECRET: string | undefined,
    JWT_REFRESH_SECRET: string | undefined,
    RAZORPAY_KEY_ID: string | undefined,
    RAZORPAY_SECRET: string | undefined,
    PORT: string | undefined,
    REDIS_URL: string | undefined,
    GOOGLE_CLIENT_ID: string | undefined,
    GOOGLE_CLIENT_SECRET: string | undefined,
    GOOGLE_CALLBACK_URL: string | undefined,
    BREVO_API_KEY: string | undefined,
    GMAIL_USER: string | undefined,
    GMAIL_PASS: string | undefined,
    GMAIL_CLIENT_ID: string | undefined,
    GMAIL_CLIENT_SECRET: string | undefined,
    GMAIL_REFRESH_TOKEN: string | undefined,
    GMAIL_REDIRECT_URI: string | undefined,
    IPINFO_TOKEN: string | undefined,
    REFERRAL_SECRET: string | undefined,
    CODE_RUNNER_IP: string | undefined,
    ADMIN_SECRET_CODES: string | undefined,
    COOKIE_DOMAIN: string | undefined,
};

const config: envVariablesInterface = {
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
    GMAIL_REFRESH_TOKEN: process.env.GMAIL_REFRESH_TOKEN,
    IPINFO_TOKEN: process.env.IPINFO_TOKEN,
    REFERRAL_SECRET: process.env.REFERRAL_SECRET,
    CODE_RUNNER_IP: process.env.CODE_RUNNER_IP,
    ADMIN_SECRET_CODES: process.env.ADMIN_SECRET_CODES,
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
}

export default config;