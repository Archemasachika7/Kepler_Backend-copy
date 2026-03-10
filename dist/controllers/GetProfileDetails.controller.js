import { collection } from "../models/collection.model.js";
const getProfileDetails = async (req, res) => {
    try {
        const { emailId } = req.body;
        const profileInfo = await collection.findOne({ email: emailId });
        if (!profileInfo) {
            res.status(404).json({
                message: "User not found"
            });
            return;
        }
        let educationInfo = {};
        if (profileInfo.education_type === "school") {
            educationInfo = {
                education_type: profileInfo.education_type,
                school: profileInfo.school,
                school_year: profileInfo.school_year,
            };
        }
        else if (profileInfo.education_type === "college") {
            educationInfo = {
                education_type: profileInfo.education_type,
                college: profileInfo.college,
                college_stream: profileInfo.college_stream,
                college_year: profileInfo.college_year,
                college_department: profileInfo.college_department,
            };
        }
        else {
            educationInfo = {
                education_type: profileInfo.education_type,
                work_country: profileInfo.work_country,
                work_state: profileInfo.work_state,
                work_city: profileInfo.work_city,
                work_company: profileInfo.work_company,
                work_position: profileInfo.work_position,
            };
        }
        const responseData = {
            email: profileInfo.email,
            name: profileInfo.name,
            phone: profileInfo.phone,
            country: profileInfo.country,
            state: profileInfo.state,
            city: profileInfo.city,
            ...educationInfo,
            referCode: profileInfo.refercode,
            userNumber: profileInfo.usenumber,
        };
        res.status(200).json({
            profile: responseData
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
export default getProfileDetails;
