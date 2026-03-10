import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});
(async () => {
    try {
        const connection = await pool.query('SELECT NOW()');
        console.log("PostgresSQL connection successful", connection.rows[0].now);
    }
    catch (error) {
        console.error("PostgreSQL connection failed", error);
    }
})();
export default pool;
