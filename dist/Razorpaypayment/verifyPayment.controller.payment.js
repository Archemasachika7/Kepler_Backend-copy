import crypto from "crypto";
import { RAZORPAY_SECRET, redis } from "../index.js";
import { admittedCoursesModel } from "../models/admittedCourses.model.js";
import axios from "axios";
import dotenv from "dotenv";
import getNextPaymentDate from "../utils/NextMonthLastDate.js";
import { sendRegistrationEmail } from "../utils/mailsend.utils.js";
import { scheduleEmailPaymentReminder } from "../utils/PaymentEmails/scheduleEmail.js";
import { collection } from "../models/collection.model.js";
dotenv.config();
const verifyPayment = async (req, res) => {
    try {
        const userName = req.body.userName;
        const userEmail = req.body.userEmail;
        const razorpay_payment_id = req.body.razorpay_payment_id;
        const razorpay_order_id = req.body.razorpay_order_id;
        const razorpay_signature = req.body.razorpay_signature;
        const referralCode_giver = req.body.referralCode_giver;
        const coursesBought = req.body.coursesBought;
        const additionalCoursesApplied = req.body.additionalCoursesApplied;
        const referralCode_taker = await collection.find({ email: userEmail }).select('refercode');
        const [referralCode_giver_emailId, referralCode_giver_name] = await collection.find({ refercode: referralCode_giver }).select(['email', 'name']);
        const sign = crypto.createHmac("sha256", RAZORPAY_SECRET ?? "").update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");
        if (sign == razorpay_signature) {
            const { data } = await axios.get(`https://api.razorpay.com/v1/payments/${razorpay_payment_id}`, {
                auth: {
                    username: process.env.RAZORPAY_KEY_ID ?? "",
                    password: process.env.RAZORPAY_SECRET ?? "",
                },
            });
            console.log(data);
            if (data.status != "captured") {
                res.status(950).json({
                    status: "Failure",
                    message: "Not payment",
                });
                return;
            }
            const currentTime = new Date(Date.now()).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            });
            if (referralCode_giver != null) {
                const prevReferrals = await redis.get(referralCode_giver);
                if (prevReferrals != null) {
                    const parsedPrevReferrals = JSON.parse(prevReferrals);
                    const referralInfo = {
                        referralCode_taker: referralCode_taker,
                        dateReferred: currentTime,
                        coursesBought: coursesBought,
                        additionalCourses: additionalCoursesApplied,
                    };
                    parsedPrevReferrals.push(referralInfo);
                    await redis.set(referralCode_giver, JSON.stringify(parsedPrevReferrals), 'EX', 2592000); // 1 month in seconds
                }
                else {
                    const referralArray = [];
                    const referralInfo = {
                        referralCode_taker: referralCode_taker,
                        dateReferred: currentTime,
                        coursesBought: coursesBought,
                        additionalCourses: additionalCoursesApplied,
                    };
                    referralArray.push(referralInfo);
                    await redis.set(referralCode_giver, JSON.stringify(referralArray), 'EX', 2592000); // 1 month in seconds
                }
                await sendRegistrationEmail("kepler.xxiib.cygnus@gmail.com", JSON.stringify(referralCode_giver_emailId), "Required: Verify Referral Purchase on Your Kepler Account", `
          <div>Hello ${referralCode_giver_name}</div>
          <br/>
          <div>We noticed that a student may have used your Kepler referral code while purchasing a course. To confirm and credit the referral correctly (to claim your reward), we need you to verify this from your Kepler account. Please log in to your Kepler dashboard and check the <b>Referral History</b> section to confirm whether the following student is visible under your referrals:</div>
          <br/>
          <div>Student Name: <b>${userName}</b></div>
          <br/>
          <div>Registered Email: <b>${userEmail}</b></div>
          <br/>
          <div>Date of Purchase: <b>${currentTime}</b></div>
          <br/>
          <div>If you can see this entry, please log in to your website, go to the aforementioned section and respond with a quick confirmation, which should be the <b>"yes"</b> option. If you <b>do not</b> know about the entry, respond with the <b>“no”</b> option so we can investigate and resolve it.</div>
          <br/>
          <div>Login link: <a href="https://kepler-22b.vercel.app">https://kepler-22b.vercel.app</a></div>
          <br/>
          <div>Thanks for your help, this will ensure your referral credit is processed without delay.</div>
          <br/>
          <div>Regards</div>
          <div>Kepler Codes</div>
        `);
            }
            const nextPaymentDate = getNextPaymentDate();
            const startingDate = new Date(nextPaymentDate);
            startingDate.setDate(startingDate.getDate() - 1);
            const transactionDetails = [
                {
                    name: "Transaction ID:",
                    value: data.id,
                    copy: true,
                },
                {
                    name: "Amount:",
                    salutation: "INR",
                    value: data.amount / 100,
                },
                {
                    name: "Status:",
                    value: data.status,
                    color: "text-green-700",
                },
            ];
            const paymentDetails = [
                {
                    name: "Payment Date",
                    value: currentTime,
                },
                {
                    name: "Payment Status",
                    value: "Success",
                    color: "text-green-700"
                },
                {
                    name: "Transaction ID",
                    value: data.id,
                    copy: true,
                },
                {
                    name: "Payment Method",
                    value: data.method,
                },
                {
                    name: "Amount Paid",
                    salutation: "INR",
                    value: data.amount / 100,
                },
                {
                    name: "Order Id",
                    value: data.order_id,
                    copy: true
                },
            ];
            const logDetails = {
                name: "Payment Successful",
                value1: currentTime,
                value2: data.amount / 100,
                value3: "Payment initiation request received"
            };
            const doc = await admittedCoursesModel.findOne({ email: userEmail });
            let coursesSelectedAndAccepted = [];
            let validity = new Date();
            if (doc) {
                let minimumDate = new Date();
                minimumDate.setDate(minimumDate.getDate() + 31);
                for (const course of doc.admittedCourses) {
                    const courseStartPayment = course.upcomingPaymentDate;
                    if (courseStartPayment < minimumDate) {
                        minimumDate = courseStartPayment;
                    }
                }
                let admittedCoursesList = doc.admittedCourses;
                coursesSelectedAndAccepted = doc.selectedCourses;
                doc.selectedCourses.forEach((val) => {
                    const pursuingCourse = doc.admittedCourses.find(course => course.name == val);
                    if (pursuingCourse) {
                        const firstDate = pursuingCourse?.upcomingPaymentDate;
                        admittedCoursesList = admittedCoursesList.filter((course) => course.name !== val);
                        if (new Date().getDate() == new Date(firstDate).getDate() && new Date().getMonth() == new Date(firstDate).getMonth() && new Date().getFullYear() == new Date(firstDate).getFullYear()) {
                            const lastDate = new Date(nextPaymentDate);
                            lastDate.setDate(lastDate.getDate() + 1);
                            admittedCoursesList.push({
                                name: val,
                                coursePaymentDate: currentTime,
                                upcomingPaymentDate: nextPaymentDate,
                                lastDateToPay: lastDate,
                                validity: lastDate
                            });
                            validity = lastDate;
                            if (nextPaymentDate < minimumDate) {
                                minimumDate = nextPaymentDate;
                            }
                        }
                        else {
                            admittedCoursesList.push({
                                name: val,
                                coursePaymentDate: currentTime,
                                upcomingPaymentDate: startingDate,
                                lastDateToPay: nextPaymentDate,
                                validity: nextPaymentDate
                            });
                            validity = nextPaymentDate;
                            if (startingDate < minimumDate) {
                                minimumDate = startingDate;
                            }
                        }
                    }
                    else {
                        admittedCoursesList.push({
                            name: val,
                            coursePaymentDate: currentTime,
                            upcomingPaymentDate: startingDate,
                            lastDateToPay: nextPaymentDate,
                            validity: nextPaymentDate
                        });
                        validity = nextPaymentDate;
                        if (startingDate < minimumDate) {
                            minimumDate = startingDate;
                        }
                    }
                });
                const upcomingLastDate = new Date(minimumDate);
                upcomingLastDate.setDate(upcomingLastDate.getDate() + 1);
                const upcomingPaymentDetails = [
                    {
                        name: "Upcoming Payment Date",
                        value: minimumDate.toLocaleDateString("en-IN"),
                    },
                    {
                        name: "Last Date for Upcoming Payment",
                        value: upcomingLastDate.toLocaleDateString("en-IN"),
                        color: "text-red-700",
                    },
                ];
                doc.admittedCourses = admittedCoursesList;
                doc.selectedCourses = [];
                doc.transaction_details = transactionDetails;
                doc.payment_details = paymentDetails;
                doc.upcoming_payment_details = upcomingPaymentDetails;
                doc.log_details = [...(doc.log_details || []), logDetails];
                doc.additionalCourses = additionalCoursesApplied;
                doc.appliedAdditionalCourses = [];
                await doc.save();
            }
            else {
                const newDoc = new admittedCoursesModel({
                    email: userEmail,
                    name: userName,
                    admittedCourses: [],
                    selectedCourses: [],
                    newCourses: [],
                    transaction_details: transactionDetails,
                    payment_details: paymentDetails,
                    upcoming_payment_details: [],
                    log_details: [logDetails],
                });
                await newDoc.save();
            }
            res.status(200).json({
                status: "Success",
            });
            await sendRegistrationEmail(process.env.GMAIL_USER ?? "", userEmail, "Payment Successful", `<div>Greetings from Kepler 22B!</div><br>
        <div>Dear ${userName}</div>
        <div>This email is to inform you that we have received the payment you made on ${currentTime} for the courses ${coursesSelectedAndAccepted.join(', ')}. We thank you for choosing Kepler and we wish you best of luck for your future endeavors.</div>
        <br>
        <div>Please note the validity of these courses is till ${validity.toLocaleDateString("en-IN")}. If you are unable to pay for these courses before ${validity.toLocaleDateString("en-IN")}, you will lose access to these courses after ${validity.toLocaleDateString("en-IN")}</div>
        <br>
        <div>Thank you</div>
        <br>
        <div>Kepler 22B</div>`);
            await scheduleEmailPaymentReminder(userEmail, userName, coursesSelectedAndAccepted);
        }
        else {
            res.status(900).json({
                status: "Failure",
                message: "Invalid Signature",
            });
        }
    }
    catch (err) {
        console.log("Error verifying payment", err);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
};
export default verifyPayment;
