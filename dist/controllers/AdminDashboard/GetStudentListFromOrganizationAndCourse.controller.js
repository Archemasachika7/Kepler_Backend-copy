import { executive_emails } from "../../local_dbs.js";
import { collection } from "../../models/collection.model.js";
import { admittedCoursesModel } from "../../models/admittedCourses.model.js";
const getStudentInformationFromCourseAndOrganization = async (req, res) => {
    const { emailId, courseName, organizationName } = req.body;
    if (!executive_emails.includes(emailId)) {
        res.status(401).json({
            message: "User is not authorized to access this page",
        });
        return;
    }
    const courseNameWithPrefix = courseName.map((course) => `Computer Science - ${course}`);
    const sameOrganization = await collection.find({
        $or: [
            { school: organizationName },
            { college: organizationName },
            { work_company: organizationName },
        ],
    });
    const sameCourse = await admittedCoursesModel.find({
        "admittedCourses.name": { $all: courseNameWithPrefix },
    });
    console.log(sameCourse);
    const responseData = [];
    for (const student of sameOrganization) {
        const email = student.email;
        const courseDetails = sameCourse.find((stud) => stud.email === email);
        if (!courseDetails)
            continue;
        let educationDetails = {};
        if (student.education_type === "school") {
            educationDetails = {
                schoolName: student.school,
                schoolYear: student.school_year,
            };
        }
        else if (student.education_type === "college") {
            educationDetails = {
                collegeName: student.college,
                collegeStream: student.college_stream,
                collegeYear: student.college_year,
                collegeDepartment: student.college_department,
            };
        }
        else {
            educationDetails = {
                work_country: student.work_country,
                work_state: student.work_state,
                work_city: student.work_city,
                work_company: student.work_company,
                work_position: student.work_position,
                work_duration: student.work_duration,
            };
        }
        responseData.push({
            name: student.name,
            email: student.email,
            phoneNumber: student.phone,
            educationType: student.education_type,
            country: student.country,
            state: student.state,
            city: student.city,
            ...educationDetails,
            referCode: student.refercode,
            referral_giver: student.referrer_refer_code,
            admittedCourses: courseDetails.admittedCourses,
        });
    }
    res.status(200).json({
        responseData,
        message: "All Student Data found successfully",
    });
};
export default getStudentInformationFromCourseAndOrganization;
