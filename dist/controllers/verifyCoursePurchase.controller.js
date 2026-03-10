import { admittedCoursesModel } from "../models/admittedCourses.model.js";
import { grouplist } from "../local_dbs.js";
const verifyCoursePurchase = async (req, res) => {
    const { email, examname } = req.body;
    const admittedCourseDetails = await admittedCoursesModel.findOne({ email: email });
    if (!admittedCourseDetails) {
        res.status(400).json({
            message: "User did not buy any course"
        });
        return;
    }
    const admittedCourses = admittedCourseDetails.admittedCourses.map(val => val.name);
    const courseFullName = grouplist.find(data => data.exam == examname)?.name;
    if (admittedCourses.includes("Computer Science - Placements Made Easier") && ["fundamentals", "webdev", "dsa"].includes(examname)) {
        res.status(200).json({
            message: "User can access this course"
        });
        return;
    }
    else if (admittedCourses.includes(courseFullName)) {
        res.status(200).json({
            message: "User can access this course"
        });
        return;
    }
    res.status(400).json({
        message: "User did not purchase this course"
    });
};
export default verifyCoursePurchase;
