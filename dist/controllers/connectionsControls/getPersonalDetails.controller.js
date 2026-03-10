import { collection } from "../../models/collection.model";
import pool from "../../utils/postgresConnection.utils";
import { userSockets } from "../..";
const getPersonalDetails = async (req, res) => {
    try {
        const { email } = req.body;
        const sendPendingConnectionQuery = `SELECT * FROM connectionrequestschema WHERE receiveremail = $1`;
        const response = await pool.query(sendPendingConnectionQuery, [email]);
        response.rows.forEach((row) => {
            userSockets.get(email)?.forEach((socket) => {
                console.log(socket + "is open");
                if (socket.readyState == socket.OPEN) {
                    socket.send(JSON.stringify({
                        type: "PENDING_CONNECTION_REQUEST",
                        senderEmail: row.senderemail
                    }));
                }
            });
        });
        const userDetails = await collection.findOne({ email });
        if (!userDetails) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const responseData = {
            name: userDetails.name,
            email: userDetails.email,
            phone: userDetails.phone,
            country: userDetails.country,
            state: userDetails.state,
            city: userDetails.city,
            education_type: userDetails.education_type,
        };
        if (userDetails.education_type === "school") {
            Object.assign(responseData, {
                school: userDetails.school,
                school_year: userDetails.school_year,
            });
        }
        else if (userDetails.education_type === "college") {
            Object.assign(responseData, {
                college: userDetails.college,
                college_stream: userDetails.college_stream,
                college_year: userDetails.college_year,
                college_department: userDetails.college_department,
            });
        }
        else {
            Object.assign(responseData, {
                work_company: userDetails.work_company,
                work_position: userDetails.work_position,
                work_duration: userDetails.work_duration,
                work_city: userDetails.work_city,
                work_state: userDetails.work_state,
                work_country: userDetails.work_country,
            });
        }
        const query = `SELECT * FROM connectionProfileSchema WHERE email = $1`;
        try {
            const response = await pool.query(query, [email]);
            if (response.rows.length === 0) {
                res.status(200).json({
                    profileDetails: responseData,
                    message: "Profile details not found in PostgreSQL",
                });
                return;
            }
            const pgData = response.rows[0];
            Object.assign(responseData, {
                linkedinurl: pgData.linkedinurl,
                githuburl: pgData.githuburl,
                portfoliourl: pgData.portfoliourl,
                headline: pgData.headline,
                bio: pgData.bio,
                techstack: pgData.techstack,
                skills: pgData.skills,
                projects: pgData.projects,
                endorsements: pgData.endorsements,
                isOpenToWork: pgData.isopentowork,
            });
            res.status(200).json({
                profileDetails: responseData,
                message: "Profile details fetched successfully from Postgres",
            });
        }
        catch (err) {
            console.error("Failed to fetch the connection details from Postgres", err);
            res.status(500).json({
                message: "Internal Server Error while fetching profile details from Postgres",
            });
        }
    }
    catch (error) {
        console.error("Error fetching profile details:", error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
export default getPersonalDetails;
