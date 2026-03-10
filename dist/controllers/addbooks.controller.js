import pool from "../utils/postgresConnection.utils.js";
import { executive_emails } from "../local_dbs.js";
const addbooks = async (req, res) => {
    const { email, course, title, author, url } = req.body;
    if (!executive_emails.includes(email)) {
        res.status(402).send("You are not authorized to add books");
        return;
    }
    if (!course || !title || !author || !url) {
        res.status(400).send("All fields are required");
        return;
    }
    const query = `INSERT INTO library (course, title, author, url) VALUES ($1, $2, $3, $4)`;
    const params = [course, title, author, url];
    const response = await pool.query(query, params);
    if (response.rowCount == 0) {
        res.status(500).send("Failed to add books");
        return;
    }
    res.status(200).send("OK");
};
export default addbooks;
