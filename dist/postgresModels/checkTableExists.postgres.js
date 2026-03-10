import pool from "../utils/postgresConnection.utils.js";
const checkTableExists = async (tableName) => {
    try {
        const query = `SELECT EXISTS (
            SELECT 1 
            FROM information_schema.tables
            WHERE table_schema = 'public'
            AND table_name = $1
        ) AS "exists";`;
        const response = await pool.query(query, [tableName]);
        console.log("Table existence confirmed: ", response.rows[0].exists);
        return response.rows[0].exists;
    }
    catch (error) {
        console.error("Table NOT found", error);
        return false;
    }
};
export default checkTableExists;
