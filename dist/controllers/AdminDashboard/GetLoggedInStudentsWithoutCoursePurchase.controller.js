import { executive_emails } from "../../local_dbs.js";
import { admittedCoursesModel } from "../../models/admittedCourses.model.js";
import { collection } from "../../models/collection.model.js";
const getLoggedInStudentsWithoutPurchase = async (req, res) => {
    const { emailId } = req.body;
    if (!executive_emails.includes(emailId)) {
        res.status(401).json({
            message: "UnAuthorized"
        });
        return;
    }
    const allUsers = await collection.find({});
    const responseData = [];
    for (const user of allUsers) {
        const courseDetails = await admittedCoursesModel.find({ email: user.email });
        if (!courseDetails || courseDetails.length === 0) {
            let educationDetails = {};
            if (user.education_type === "school") {
                educationDetails = {
                    schoolName: user.school,
                    schoolYear: user.school_year,
                };
            }
            else if (user.education_type === "college") {
                educationDetails = {
                    collegeName: user.college,
                    collegeStream: user.college_stream,
                    collegeYear: user.college_year,
                    collegeDepartment: user.college_department,
                };
            }
            else {
                educationDetails = {
                    work_country: user.work_country,
                    work_state: user.work_state,
                    work_city: user.work_city,
                    work_company: user.work_company,
                    work_position: user.work_position,
                    work_duration: user.work_duration,
                };
            }
            const responseDataItem = {
                name: user.name,
                email: user.email,
                phoneNumber: user.phone,
                educationType: user.education_type,
                country: user.country,
                state: user.state,
                city: user.city,
                ...educationDetails,
                referCode: user.refercode,
                referral_giver: user.referrer_refer_code,
                admittedCourses: "User did not buy any course",
            };
            responseData.push(responseDataItem);
        }
    }
    res.status(200).json({
        message: "Success",
        responseData: responseData,
    });
};
export default getLoggedInStudentsWithoutPurchase;
