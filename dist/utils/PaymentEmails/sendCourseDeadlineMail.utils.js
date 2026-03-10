import { Worker } from "bullmq";
import { sendRegistrationEmail } from '../mailsend.utils';
import dotenv from "dotenv";
import { redis } from '../../index';
dotenv.config();
export const workerProcess = new Worker("emailQueue", async (job) => {
    const receiverEmail = job.data.receiverEmail;
    const receiverName = job.data.receiverName;
    const courses = job.data.courses;
    await sendRegistrationEmail(process.env.GMAIL_USER ?? "", receiverEmail, "Payment of Fees", `
        <div>Greetings from Kepler-22B</div><br>
        <div>Dear ${receiverName}</div><br>
        <div>Your payment window for the courses ${courses.join(', ')} is now live for today and tomorrow. Please make the payment before tomorrow end of day in order to continue studying these courses. The deadline for the payment is tomorrow till 11:59 pm. Failure to make the payment within deadline will result in preventing the access to these courses.</div>
        <br>
        <div>Thank you for choosing Kepler</div>
        <br><div>Kepler-22B</div>     
    `);
}, {
    connection: redis,
});
