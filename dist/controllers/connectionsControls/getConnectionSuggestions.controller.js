import { collection } from "../../models/collection.model.js";
import pool from "../../utils/postgresConnection.utils.js";
const getConnectionSuggestionsController = async (req, res) => {
    try {
        const personalEmail = req.body.email;
        const personalUserDetails = await collection.findOne({ email: personalEmail });
        if (personalUserDetails == null) {
            res.status(404).json({
                message: "Personal user details not found"
            });
            return;
        }
        res.status(200);
        res.setHeader("Content-Type", "application/x-ndjson");
        res.setHeader("Transfer-Encoding", "chunked");
        res.setHeader("Connection", "keep-alive");
        const send = (obj) => {
            res.write(JSON.stringify(obj) + "\n");
        };
        send({
            message: "Connection Fetching Starting",
            type: "Start"
        });
        if (personalUserDetails.education_type == 'school') {
            const randomizedSameSchoolUsers = await collection.aggregate([
                {
                    $match: {
                        school: personalUserDetails.school,
                        email: { $ne: personalEmail }
                    },
                }, {
                    $sample: { size: 10 }
                }
            ]);
            for await (const user of randomizedSameSchoolUsers) {
                const connectedQuery = `SELECT 1 FROM connectedemailschema WHERE owneremail = $1 AND connectedemail = $2`;
                const connectedQueryResponse = await pool.query(connectedQuery, [personalEmail, user.email]);
                if (connectedQueryResponse.rows.length !== 0) {
                    continue;
                }
                const connectionRequestQuery = `SELECT 1 FROM connectionrequestschema WHERE (senderemail = $1 AND receiveremail = $2) OR (senderemail = $2 AND receiveremail = $1)`;
                const connectionRequestQueryResponse = await pool.query(connectionRequestQuery, [personalEmail, user.email]);
                if (connectionRequestQueryResponse.rows.length != 0) {
                    continue;
                }
                const suggestedConnectionEmail = user.email;
                let responseData = {};
                Object.assign(responseData, {
                    name: user.name,
                    email: user.email,
                    education_type: user.education_type,
                    school: user.school,
                    school_year: user.school_year,
                });
                try {
                    const query = `SELECT * FROM connectionprofileschema WHERE email = $1`;
                    const response = await pool.query(query, [suggestedConnectionEmail]);
                    if (response.rows.length != 0) {
                        Object.assign(responseData, {
                            headline: response.rows[0].headline,
                            bio: response.rows[0].bio,
                            githuburl: response.rows[0].githuburl,
                            linkedinurl: response.rows[0].linkedinurl,
                            portfoliourl: response.rows[0].portfoliourl,
                            techstack: response.rows[0].techstack,
                            skills: response.rows[0].skills,
                            isOpenToWork: response.rows[0].isopentowork,
                            endorsements: response.rows[0].endorsements,
                        });
                    }
                }
                catch (error) {
                    console.log("Error in fetching connection profile details for suggested connection", error);
                }
                send({
                    message: "Suggested Connection Found",
                    responseData: responseData,
                    type: "Connection"
                });
            }
        }
        else if (personalUserDetails.education_type == 'college') {
            const randomizedSameCollegeUsers = await collection.aggregate([
                { $match: {
                        college: personalUserDetails.college,
                        email: { $ne: personalEmail }
                    },
                }, {
                    $sample: { size: 10 }
                }
            ]);
            for await (const user of randomizedSameCollegeUsers) {
                const connectedQuery = `SELECT 1 FROM connectedemailschema WHERE owneremail = $1 AND connectedemail = $2`;
                const connectedQueryResponse = await pool.query(connectedQuery, [personalEmail, user.email]);
                if (connectedQueryResponse.rows.length !== 0) {
                    continue;
                }
                const connectionRequestQuery = `SELECT 1 FROM connectionrequestschema WHERE (senderemail = $1 AND receiveremail = $2) OR (senderemail = $2 AND receiveremail = $1)`;
                const connectionRequestQueryResponse = await pool.query(connectionRequestQuery, [personalEmail, user.email]);
                if (connectionRequestQueryResponse.rows.length != 0) {
                    continue;
                }
                let responseData = {};
                const suggestedConnectionEmail = user.email;
                Object.assign(responseData, {
                    name: user.name,
                    email: user.email,
                    education_type: user.education_type,
                    college: user.college,
                    college_year: user.college_year,
                    college_stream: user.college_stream,
                    college_department: user.college_department,
                });
                try {
                    const query = `SELECT * FROM connectionprofileschema WHERE email = $1`;
                    const response = await pool.query(query, [suggestedConnectionEmail]);
                    if (response.rows.length != 0) {
                        Object.assign(responseData, {
                            headline: response.rows[0].headline,
                            bio: response.rows[0].bio,
                            githuburl: response.rows[0].githuburl,
                            linkedinurl: response.rows[0].linkedinurl,
                            portfoliourl: response.rows[0].portfoliourl,
                            techstack: response.rows[0].techstack,
                            skills: response.rows[0].skills,
                            isOpenToWork: response.rows[0].isopentowork,
                            endorsements: response.rows[0].endorsements,
                        });
                    }
                }
                catch (error) {
                    console.log("Error in fetching connection profile details for suggested connection", error);
                }
                send({
                    message: "Suggested Connection Found",
                    responseData: responseData,
                    type: "Connection"
                });
            }
        }
        else if (personalUserDetails.education_type == 'work') {
            const randomsizedSameCompanyUsers = await collection.aggregate([
                { $match: {
                        company: personalUserDetails.work_company,
                        email: { $ne: personalEmail }
                    } }, {
                    $sample: { size: 10 }
                }
            ]);
            for await (const user of randomsizedSameCompanyUsers) {
                const connectedQuery = `SELECT 1 FROM connectedemailschema WHERE owneremail = $1 AND connectedemail = $2`;
                const connectedQueryResponse = await pool.query(connectedQuery, [personalEmail, user.email]);
                if (connectedQueryResponse.rows.length !== 0) {
                    continue;
                }
                const connectionRequestQuery = `SELECT 1 FROM connectionrequestschema WHERE (senderemail = $1 AND receiveremail = $2) OR (senderemail = $2 AND receiveremail = $1)`;
                const connectionRequestQueryResponse = await pool.query(connectionRequestQuery, [personalEmail, user.email]);
                if (connectionRequestQueryResponse.rows.length != 0) {
                    continue;
                }
                const suggestedConnectionEmail = user.email;
                let responseData = {};
                Object.assign(responseData, {
                    name: user.name,
                    email: user.email,
                    education_type: user.education_type,
                    work_company: user.work_company,
                    work_position: user.work_position,
                    work_city: user.work_city,
                    work_state: user.work_state,
                    work_country: user.work_country,
                    work_duration: user.work_duration,
                });
                try {
                    const query = `SELECT * FROM connectionprofileschema WHERE email = $1`;
                    const response = await pool.query(query, [suggestedConnectionEmail]);
                    if (response.rows.length != 0) {
                        Object.assign(responseData, {
                            headline: response.rows[0].headline,
                            bio: response.rows[0].bio,
                            githuburl: response.rows[0].githuburl,
                            linkedinurl: response.rows[0].linkedinurl,
                            portfoliourl: response.rows[0].portfoliourl,
                            techstack: response.rows[0].techstack,
                            skills: response.rows[0].skills,
                            isOpenToWork: response.rows[0].isopentowork,
                            endorsements: response.rows[0].endorsements,
                        });
                    }
                }
                catch (error) {
                    console.log("Error in fetching connection profile details for suggested connection", error);
                }
                send({
                    message: "Suggested Connection Found",
                    responseData: responseData,
                    type: "Connection"
                });
            }
        }
        else {
            send({
                message: "No user exists",
                type: "End"
            });
            res.end();
            return;
        }
        send({
            message: "All connections fetched successfully",
            type: "End"
        });
        res.end();
    }
    catch (error) {
        console.log("Error in getting the connection suggestions", error);
        res.status(500).json({
            message: "Internal server error while getting the connection suggestions"
        });
    }
};
export default getConnectionSuggestionsController;
