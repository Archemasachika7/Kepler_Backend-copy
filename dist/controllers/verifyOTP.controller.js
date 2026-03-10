import { redis } from "../index.js";
import { sendRegistrationEmail } from "../utils/mailsend.utils.js";
import dotenv from 'dotenv';
import { collection } from "../models/collection.model.js";
dotenv.config();
const otpVerify = async (req, res) => {
    const email = req.body.email;
    const userOTP = req.body.otp;
    const storedOTP = await redis.get(`otp${email}`);
    const storeData = await redis.get(`userDetails${email}`);
    const parsedData = JSON.parse(storeData ?? "");
    const data = new collection(parsedData);
    if (storedOTP && userOTP == storedOTP) {
        await data.save();
        await sendRegistrationEmail(process.env.GMAIL_USER ?? "", data.email, "Kepler", "<div>Welcome to Kepler 22B. Wish you a very happy time at Kepler 22B.</div><br><div>Regards,</div><div>Farshid Hossain</div><div>Co-Founder</div>");
        await redis.del(`otp${email}`);
        await redis.del(`userDetails${email}`);
        res.status(200).send("OK");
    }
    else {
        if (storedOTP) {
            await redis.del(`otp${email}`);
        }
        if (storeData) {
            await redis.del(`userDetails${email}`);
        }
        res.status(400).send("NOT OK");
    }
};
export { otpVerify };
