import { executive_emails } from "../../local_dbs.js";
import { collection } from "../../models/collection.model.js";
import { admittedCoursesModel } from "../../models/admittedCourses.model.js";
const studentDetailsFromStudentData = async (req, res) => {
    const { emailId, email, phone } = req.body;
    if (!executive_emails.includes(emailId)) {
        res.status(401).json({
            message: "UnAuthorized",
        });
        return;
    }
    let studentData = null;
    if (!email || !phone) {
        studentData = await collection.findOne({
            $or: [{ phone: phone }, { email: email }],
        });
    }
    else if (email && phone) {
        studentData = await collection.findOne({
            $and: [{ phone: phone }, { email: email }],
        });
    }
    if (!studentData) {
        res.status(405).json({
            message: "Student does not exist",
        });
        return;
    }
    const courseDetails = await admittedCoursesModel.findOne({
        email: studentData.email,
    });
    let educationDetails = {};
    if (studentData.education_type === "school") {
        educationDetails = {
            schoolName: studentData.school,
            schoolYear: studentData.school_year,
        };
    }
    else if (studentData.education_type === "college") {
        educationDetails = {
            collegeName: studentData.college,
            collegeStream: studentData.college_stream,
            collegeYear: studentData.college_year,
            collegeDepartment: studentData.college_department,
        };
    }
    else {
        educationDetails = {
            work_country: studentData.work_country,
            work_state: studentData.work_state,
            work_city: studentData.work_city,
            work_company: studentData.work_company,
            work_position: studentData.work_position,
            work_duration: studentData.work_duration,
        };
    }
    const responseData = {
        name: studentData.name,
        email: studentData.email,
        phoneNumber: studentData.phone,
        educationType: studentData.education_type,
        country: studentData.country,
        state: studentData.state,
        city: studentData.city,
        ...educationDetails,
        referCode: studentData.refercode,
        referral_giver: studentData.referrer_refer_code,
        admittedCourses: courseDetails
            ? courseDetails.admittedCourses
            : "User did not buy any course",
    };
    res.status(200).json({
        responseData: responseData,
        message: "User found successfully",
    });
};
export default studentDetailsFromStudentData;
