import pool from "../../utils/postgresConnection.utils";
const saveDetails = async (req, res) => {
    const { email } = req.body;
    try {
        const updatePersonalDetails = req.body;
        const query = `SELECT * FROM connectionProfileSchema WHERE email = $1`;
        const existingDetails = await pool.query(query, [email]);
        if (existingDetails.rows.length === 0) {
            const insertQuery = `INSERT INTO connectionProfileSchema 
            (email, githubUrl, linkedinUrl, portfolioUrl, bio, headline, techStack, projects, skills, isOpenToWork, avatar, endorsements)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;
            const insertValues = [
                email,
                updatePersonalDetails.githubUrl,
                updatePersonalDetails.linkedinUrl,
                updatePersonalDetails.portfolioUrl,
                updatePersonalDetails.bio,
                updatePersonalDetails.headline,
                updatePersonalDetails.techStack,
                updatePersonalDetails.projects,
                updatePersonalDetails.skills,
                updatePersonalDetails.isOpenToWork,
                updatePersonalDetails.avatar,
                updatePersonalDetails.endorsements
            ];
            await pool.query(insertQuery, insertValues);
            res.status(201).json({ message: "Profile details saved successfully" });
            return;
        }
        const updateQuery = `UPDATE connectionProfileSchema SET
        githubUrl = $1,
        linkedinUrl = $2,
        portfolioUrl = $3,
        bio = $4,
        headline = $5,
        techStack = $6,
        projects = $7,
        skills = $8,
        isOpenToWork = $9,
        avatar = $10,
        endorsements = $11
        WHERE email = $12`;
        const values = [
            updatePersonalDetails.githubUrl,
            updatePersonalDetails.linkedinUrl,
            updatePersonalDetails.portfolioUrl,
            updatePersonalDetails.bio,
            updatePersonalDetails.headline,
            updatePersonalDetails.techStack,
            updatePersonalDetails.projects,
            updatePersonalDetails.skills,
            updatePersonalDetails.isOpenToWork,
            updatePersonalDetails.avatar,
            updatePersonalDetails.endorsements,
            email
        ];
        await pool.query(updateQuery, values);
        res.status(200).json({ message: "Profile details updated successfully" });
    }
    catch (err) {
        console.log("Error updating profile details:", err);
        res.status(500).json({ message: "Internal Server Error while updating profile details" });
    }
};
export default saveDetails;
