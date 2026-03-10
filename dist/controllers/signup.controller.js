import crypto from 'crypto';
import { collection } from '../models/collection.model.js';
import { sendRegistrationEmail } from '../utils/mailsend.utils.js';
import { redis } from '../index.js';
import dotenv from 'dotenv';
import { generateReferralCode } from '../utils/generateReferralCode.js';
dotenv.config();
const signupaction = async (req, res) => {
    console.log(req.body.name + " came here");
    const data = req.body;
    const name = data.name;
    const phoneNumber = data.phone;
    const emailId = data.email;
    data.refercode = generateReferralCode(emailId[0], phoneNumber[0], name[0]);
    data.isvalid = true;
    data.usenumber = 10;
    const mail = await collection.find({ email: emailId });
    if (mail.length == 0) {
        const otp = crypto.randomInt(100000, 999999).toString();
        await redis.set(`otp${emailId}`, otp, 'EX', 300);
        await redis.set(`userDetails${emailId}`, JSON.stringify(data), 'EX', 300);
        await sendRegistrationEmail(process.env.GMAIL_USER ?? "", emailId, "Kepler -- OTP Verification", `Your One Time Password is ${otp}`);
        res.status(200).send("OK");
    }
    else {
        res.status(400).send("Already Registered");
    }
};
export { signupaction };
