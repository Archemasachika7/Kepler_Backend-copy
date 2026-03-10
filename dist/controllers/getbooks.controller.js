import pool from "../utils/postgresConnection.utils.js";
const getbooks = async (req, res) => {
    const course = req.body.course;
    try {
        const query = `SELECT * FROM library WHERE course = $1`;
        const response = await pool.query(query, [course]);
        const data = response.rows;
        res.status(200).json(data);
    }
    catch (error) {
        res.status(200).json([]);
    }
};
export default getbooks;
