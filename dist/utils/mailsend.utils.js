import nodemailer from "nodemailer";
import sendinblue from "nodemailer-sendinblue-transport";
import config from "../config.js";
import gmail from "./gmailAPISetup.utils.js";
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.AUTH_PASS,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });
const sendRegistrationEmail = async (email_from, email_to, subject, body) => {
    try {
        const rawMessage = [
            `From: ${email_from}`,
            `To: ${email_to}`,
            `Subject: ${subject}`,
            `MIME-Version: 1.0`,
            `Content-Type: text/html; charset=utf-8`,
            "",
            body,
        ].join("\n");
        const encodedMessage = Buffer.from(rawMessage).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
        const response = await gmail.users.messages.send({
            userId: "me",
            requestBody: {
                raw: encodedMessage
            }
        });
    }
    catch (err) {
        console.log(err + " In the Gmail Mail Sender");
        try {
            let mailOptions = {
                from: email_from,
                to: email_to,
                subject: subject,
                html: `<div>${body}</div>`,
            };
            const brevoTransporter = nodemailer.createTransport(new sendinblue({
                apiKey: config.BREVO_API_KEY
            }));
            await brevoTransporter.sendMail(mailOptions);
        }
        catch (error) {
            console.log(error + " In the Brevo Mail Sender");
        }
    }
};
export { sendRegistrationEmail };
