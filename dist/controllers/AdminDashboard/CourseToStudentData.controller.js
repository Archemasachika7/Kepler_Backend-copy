import { executive_emails } from "../../local_dbs.js";
import { admittedCoursesModel } from "../../models/admittedCourses.model.js";
import { collection } from "../../models/collection.model.js";
const getStudentDataFromCourse = async (req, res) => {
    const { emailId, courseName, courseId } = req.body;
    if (!executive_emails.includes(emailId)) {
        res.status(405).json({
            message: "User is not authorised to access this page"
        });
        return;
    }
    const fullCourseName = `Computer Science - ${courseName}`;
    const courseData = await admittedCoursesModel.find({ "admittedCourses.name": fullCourseName });
    const responseData = [];
    for (const student of courseData) {
        const emailId = student.email;
        const name = student.name;
        const studentDetails = await collection.find({ email: emailId });
        const phoneNumber = studentDetails[0].phone;
        const coursePurchaseDate = student.admittedCourses.find(course => course.name == `Computer Science - ${courseName}`).coursePaymentDate;
        const validity = student.admittedCourses.find(course => course.name == `Computer Science - ${courseName}`).validity;
        var education = "college";
        if (studentDetails[0].education_type == "college") {
            education = studentDetails[0].college;
        }
        else if (studentDetails[0].education_type == "school") {
            education = studentDetails[0].school;
        }
        else if (studentDetails[0].education_type == "work") {
            education = studentDetails[0].work_company;
        }
        responseData.push({
            name: name,
            emailId: emailId,
            phoneNumber: phoneNumber,
            educationType: studentDetails[0].education_type,
            education: education,
            coursePurchaseDate: coursePurchaseDate,
            validity: validity
        });
    }
    res.status(200).json({
        responseData: responseData,
        message: "Students details for this course found successfully"
    });
};
export default getStudentDataFromCourse;
