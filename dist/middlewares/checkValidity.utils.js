import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET } from "..";
import { admittedCoursesModel } from "../models/admittedCourses.model.js";
const checkValidity = async (req, res, next) => {
    const fullAccessToken = req.headers['authorizationaccesstoken'];
    const token = fullAccessToken?.split(' ')[1];
    const decode = jwt.verify(token, JWT_ACCESS_SECRET ?? "");
    const emailId = decode.email;
    const courseDetails = await admittedCoursesModel.find({ email: emailId });
    if (courseDetails.length == 0) {
        //     if(req.path.endsWith(`/payment/applyCourses`) || req.path.endsWith(`/payment/getCurrentCourses`) || req.path.endsWith('/library/courses/getCourses')){
        //         next();
        //         return;
        //     }
        //     res.status(405).send("User did not purchase any course");
        //     return;
        next();
        return;
    }
    const admittedCourses = courseDetails[0]?.admittedCourses || [];
    const updatedCourses = admittedCourses.filter((course) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lastDate = course?.lastDateToPay;
        lastDate.setHours(0, 0, 0, 0);
        return today <= lastDate;
    });
    if (updatedCourses.length != admittedCourses.length) {
        courseDetails[0].admittedCourses = updatedCourses;
        if (updatedCourses.length == 0) {
            courseDetails[0].upcoming_payment_details = [];
        }
        await courseDetails[0].save();
    }
    next();
};
export default checkValidity;
