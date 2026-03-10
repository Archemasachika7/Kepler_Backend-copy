import { collection } from "../../models/collection.model";
import pool from "../../utils/postgresConnection.utils";
const getConnectionRequestDetailsController = async (req, res) => {
    const { email } = req.body;
    try {
        const userdetails = await collection.findOne({ email });
        if (!userdetails) {
            res.status(404).json({
                message: "User not found"
            });
            return;
        }
        const responseData = {
            name: userdetails.name,
            email: userdetails.email,
            country: userdetails.country,
            state: userdetails.state,
            city: userdetails.city,
            education_type: userdetails.education_type,
        };
        if (userdetails.education_type === "school") {
            Object.assign(responseData, {
                school: userdetails.school,
                school_year: userdetails.school_year,
            });
        }
        else if (userdetails.education_type === "college") {
            Object.assign(responseData, {
                college: userdetails.college,
                college_stream: userdetails.college_stream,
                college_year: userdetails.college_year,
                college_department: userdetails.college_department,
            });
        }
        else {
            Object.assign(responseData, {
                work_company: userdetails.work_company,
                work_position: userdetails.work_position,
                work_duration: userdetails.work_duration,
                work_city: userdetails.work_city,
                work_state: userdetails.work_state,
                work_country: userdetails.work_country,
            });
        }
        const query = `SELECT headline, bio, techStack, skills, githubUrl, linkedinUrl, portfolioUrl, isOpenToWork, endorsements FROM connectionProfileSchema WHERE email = $1`;
        try {
            const response = await pool.query(query, [email]);
            if (response.rows.length === 0) {
                res.status(200).json({
                    profileDetails: responseData,
                    message: "Profile details not found in PostgreSQL",
                });
                return;
            }
            Object.assign(responseData, {
                headline: response.rows[0].headline,
                bio: response.rows[0].bio,
                techStack: response.rows[0].techstack,
                skills: response.rows[0].skills,
                githubUrl: response.rows[0].githuburl,
                linkedinUrl: response.rows[0].linkedinurl,
                portfolioUrl: response.rows[0].portfoliourl,
                isOpenToWork: response.rows[0].isopentowork,
                endorsements: response.rows[0].endorsements,
            });
            res.status(200).json({
                profileDetails: responseData,
                message: "Profile details fetched successfully",
            });
            return;
        }
        catch (error) {
            console.error("Error in fetching profile details from Postgres", error);
            res.status(500).json({
                message: "Internal server error"
            });
            return;
        }
    }
    catch (error) {
        console.error("Error in fetching personal data from MongoDB", error);
        res.status(500).json({
            message: "Internal server error"
        });
        return;
    }
};
export default getConnectionRequestDetailsController;
