import pool from '../utils/postgresConnection.utils.js';
import { executive_emails } from '../local_dbs';
const deleteBook = async (req, res) => {
    const { url, course, email } = req.body;
    if (!executive_emails.includes(email)) {
        res.status(402).send("You are not authorized to delete books");
        return;
    }
    if (!url || !course) {
        res.status(400).send("All fields are required");
        return;
    }
    const query = `DELETE FROM library WHERE url = $1 AND course = $2`;
    const response = await pool.query(query, [url, course]);
    if (response.rowCount == 0) {
        res.status(500).send("Failed to delete book");
        return;
    }
    res.status(200).send("Book deleted successfully");
};
export default deleteBook;
