import { collection } from "../models/collection.model.js";
import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../index.js";
import tokenschema from "../models/Token.model.js";
import historyschema from "../models/History.model.js";
import dotenv from "dotenv";
import axios from "axios";
import useragent from "useragent";
import { admittedCoursesModel } from "../models/admittedCourses.model.js";
dotenv.config();
const loginaction = async (req, res) => {
    const userDetails = useragent.parse(req.headers["user-agent"]);
    const ipRaw = req.headers["x-forwarded-for"];
    const ip = ipRaw?.split(",")[0].trim();
    const response = await axios.get(`https://ipinfo.io/${ip}/json?token=c13532365e8939`);
    const mail = await collection.find({ email: req.body.email });
    const courseDetails = await admittedCoursesModel.find({ email: req.body.email });
    if (mail.length === 0) {
        res.status(400).json({
            message: "You have not registered before. Please register first.",
        });
        return;
    }
    if (mail[0].password !== req.body.password) {
        res.status(400).json({ message: "Wrong Password" });
        return;
    }
    const accessToken = jwt.sign({
        type: "Access",
        email: mail[0].email,
        identifier: (Math.random() * 99 + 1).toFixed(2),
    }, JWT_ACCESS_SECRET ?? "", {
        expiresIn: "1h",
    });
    const refreshToken = jwt.sign({
        email: mail[0].email,
        type: "Refresh",
    }, JWT_REFRESH_SECRET ?? "", {
        expiresIn: "3d",
    });
    const tokenElement = new tokenschema({
        userId: mail[0]._id,
        email_id: mail[0].email,
        name: mail[0].name,
        token: accessToken,
        details: JSON.stringify({
            OperatingSystem: userDetails.os,
            Browser: userDetails.device,
            class: userDetails.family,
            patch: userDetails.patch,
            major: userDetails.major,
            minor: userDetails.minor,
        }),
        locations: JSON.stringify(response.data),
    });
    await tokenElement.save();
    const profiles = {
        name: mail[0].name,
        email: mail[0].email,
        phone: mail[0].phone
    };
    let sendAlert = false;
    let lastDate = null;
    let courses = [];
    if (courseDetails.length > 0 && courseDetails[0].admittedCourses.length > 0) {
        courseDetails[0].admittedCourses.forEach((val) => {
            const today = new Date();
            const upComingDate = val?.upcomingPaymentDate;
            const endingDate = val?.lastDateToPay;
            if ((today.getDate() == upComingDate.getDate() && today.getMonth() == upComingDate.getMonth() && today.getFullYear() == upComingDate.getFullYear()) || (today.getDate() == endingDate.getDate() && today.getMonth() == endingDate.getMonth() && today.getFullYear() == endingDate.getFullYear())) {
                sendAlert = true;
                lastDate = val?.lastDateToPay.toLocaleDateString("en-IN");
                courses.push(val.name);
            }
            console.log(val?.lastDateToPay.toLocaleDateString("en-IN"));
        });
    }
    res.status(200).cookie("TestCookie", accessToken, {
        domain: ".localhost",
    }).json({
        message: "OK",
        accessToken: accessToken,
        refreshToken: refreshToken,
        profileinfo: profiles,
        sendAlert: sendAlert,
        lastDate: lastDate,
        courses: courses
    });
    const prevElement = await historyschema.find({ email: mail[0].email });
    if (prevElement.length > 0) {
        await historyschema.updateOne({ email: mail[0].email }, {
            $set: {
                logintime: Date.now(),
                status: "active",
                logouttime: null,
            },
        });
    }
    else {
        const historyElement = new historyschema({
            userId: mail[0]._id,
            name: mail[0].name,
            email: mail[0].email,
            logintime: Date.now(),
            status: "active",
            details: JSON.stringify({
                OperatingSystem: userDetails.os,
                Browser: userDetails.device,
                class: userDetails.family,
                patch: userDetails.patch,
                major: userDetails.major,
                minor: userDetails.minor,
            }),
            locations: JSON.stringify(response.data),
        });
        await historyElement.save();
    }
};
export default loginaction;
