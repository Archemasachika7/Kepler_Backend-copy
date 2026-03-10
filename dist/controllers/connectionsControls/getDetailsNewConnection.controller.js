import { collection } from "../../models/collection.model";
import pool from "../../utils/postgresConnection.utils";
const getDetailsNewConnection = async (req, res) => {
    try {
        const email = req.body.email;
        const userDetails = await collection.findOne({ email: email });
        if (!userDetails) {
            res.status(404).json({
                message: "User does not exists",
            });
            return;
        }
        const responseData = {};
        Object.assign(responseData, {
            name: userDetails?.name,
            email: userDetails?.email,
            phone: userDetails?.phone,
            country: userDetails?.country,
            state: userDetails?.state,
            city: userDetails?.city,
            education_type: userDetails?.education_type,
        });
        if (userDetails?.education_type === "school") {
            Object.assign(responseData, {
                school: userDetails.school,
                school_year: userDetails.school_year,
            });
        }
        else if (userDetails?.education_type === "college") {
            Object.assign(responseData, {
                college: userDetails.college,
                college_stream: userDetails.college_stream,
                college_year: userDetails.college_year,
                college_department: userDetails.college_department,
            });
        }
        else {
            Object.assign(responseData, {
                work_company: userDetails?.work_company,
                work_position: userDetails?.work_position,
                work_duration: userDetails?.work_duration,
                work_city: userDetails?.work_city,
                work_state: userDetails?.work_state,
                work_country: userDetails?.work_country,
            });
        }
        const query = `SELECT * FROM connectionProfileSchema WHERE email = $1`;
        try {
            const response = await pool.query(query, [email]);
            if (response.rows.length == 0) {
                res.status(200).json({
                    message: "Connection Details Found",
                    connectionDetails: responseData
                });
                return;
            }
            const connectionData = response.rows[0];
            Object.assign(responseData, {
                linkedinurl: connectionData.linkedinurl,
                githuburl: connectionData.githuburl,
                portfoliourl: connectionData.portfoliourl,
                bio: connectionData.bio,
                headline: connectionData.headline,
                techstack: connectionData.techstack,
                projects: connectionData.projects,
                skills: connectionData.skills,
                isopentowork: connectionData.isopentowork,
                avatar: connectionData.avatar,
                endorsements: connectionData.endorsements
            });
            res.status(200).json({
                message: "Connection Details Found",
                connectionDetails: responseData
            });
            return;
        }
        catch (error) {
            res.status(504).json({
                message: "Failed to fetch postgres Details due to internal problems",
                connectionDetails: responseData
            });
            return;
        }
    }
    catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
        });
    }
};
export default getDetailsNewConnection;
