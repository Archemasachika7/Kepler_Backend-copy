import pool from "../../utils/postgresConnection.utils";
import { collection } from "../../models/collection.model";
const getAllConnections = async (req, res) => {
    const { email } = req.body;
    res.status(200);
    res.setHeader("Content-Type", "application/x-ndjson");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Connection", "keep-alive");
    const send = (obj) => {
        res.write(JSON.stringify(obj) + '\n');
    };
    try {
        const query = `SELECT * FROM connectedEmailSchema WHERE owneremail = $1`;
        const response = await pool.query(query, [email]);
        if (response.rows.length == 0) {
            res.status(206).json({
                message: "No connections found for this user",
                connectionDetails: {},
                connectionCount: 0
            });
            return;
        }
        send({
            type: "start",
            message: "Streaming connection details one by one",
            total: response?.rowCount || 0,
        });
        for (let i = 0; i < response.rows.length; i++) {
            const connectedEmail = response.rows[i]?.connectedemail;
            const userDetails = await collection.findOne({ email: connectedEmail });
            const responseData = {
                name: userDetails?.name,
                email: userDetails?.email,
                phone: userDetails?.phone,
                country: userDetails?.country,
                state: userDetails?.state,
                city: userDetails?.city,
                education_type: userDetails?.education_type,
            };
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
                const connectedUserProfile = await pool.query(query, [connectedEmail]);
                if (connectedUserProfile.rows.length == 0) {
                    send({
                        type: "connection",
                        index: i + 1,
                        email: connectedEmail,
                        connectionDetails: responseData,
                        hasSocialProfile: false,
                        connectionCount: 1
                    });
                    continue;
                }
                const pgData = connectedUserProfile.rows[0];
                Object.assign(responseData, {
                    linkedinurl: pgData.linkedinurl,
                    githuburl: pgData.githuburl,
                    portfoliourl: pgData.portfoliourl,
                    bio: pgData.bio,
                    headline: pgData.headline,
                    techstack: pgData.techstack,
                    projects: pgData.projects,
                    skills: pgData.skills,
                    isopentowork: pgData.isopentowork,
                    avatar: pgData.avatar,
                    endorsements: pgData.endorsements
                });
                send({
                    type: 'connection',
                    index: i + 1,
                    email: connectedEmail,
                    connectionDetails: responseData,
                    hasSocialProfile: true,
                    connectionCount: 1
                });
            }
            catch (error) {
                send({
                    type: 'error',
                    index: i + 1,
                    email: connectedEmail,
                    message: 'Error fetching details of this user from PostgreSQL'
                });
            }
        }
        send({
            type: 'done',
            message: "Finished streaming all the connection details",
            total: response.rowCount || 0,
        });
        res.end();
        return;
    }
    catch (error) {
        send({
            message: "Internal Server Error while fetching details from MongoDB"
        });
        res.end();
        return;
    }
    res.end();
};
export default getAllConnections;
