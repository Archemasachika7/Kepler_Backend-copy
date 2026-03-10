import { scheduler } from "../../index";
export const scheduleEmailPaymentReminder = async (receiverEmail, receiverName, courses) => {
    const currentDate = new Date();
    const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
    const istNow = new Date(currentDate.getTime() + IST_OFFSET_MS);
    const targetISTDate = new Date(istNow);
    targetISTDate.setDate(targetISTDate.getDate() + 29);
    targetISTDate.setHours(9, 0, 0, 0);
    const targetUTCDate = new Date(targetISTDate.getTime() - IST_OFFSET_MS);
    const delay = targetUTCDate.getTime() - currentDate.getTime();
    await scheduler.add('sendPaymentReminder', {
        receiverEmail: receiverEmail,
        receiverName: receiverName,
        courses: courses,
    }, {
        delay: delay,
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 3000
        }
    });
};
