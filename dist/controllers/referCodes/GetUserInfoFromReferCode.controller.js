import { collection } from "../../models/collection.model.js";
const getUserInformationFromReferCode = async (referCode) => {
    const user = await collection.findOne({ refercode: referCode });
    if (!user) {
        return null;
    }
    const response = {};
    Object.assign(response, {
        email: user.email,
        name: user.name,
        phoneNumber: user.phone,
        country: user.country,
        state: user.state,
        city: user.city,
        referCode: user.refercode,
    });
    if (user.education_type === "college") {
        Object.assign(response, {
            education_type: user.education_type,
            college: user.college,
            college_stream: user.college_stream,
            college_year: user.college_year,
            college_department: user.college_department,
        });
    }
    else if (user.education_type === "school") {
        Object.assign(response, {
            education_type: user.education_type,
            school: user.school,
            school_year: user.school_year,
        });
    }
    if (user.work_company) {
        Object.assign(response, {
            work_company: user.work_company,
            work_position: user.work_position,
            work_city: user.work_city,
            work_state: user.work_state,
            work_country: user.work_country,
        });
    }
    return response;
};
export default getUserInformationFromReferCode;
