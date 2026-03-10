import { executive_emails } from "../local_dbs";
import { collection } from "../models/collection.model";
import pool from "../utils/postgresConnection.utils";
const sendUsers = async (req, res) => {
    const email = req.body.email;
    if (!executive_emails.includes(email)) {
        res.status(403).send("Not an admin. InEligible to access this feature");
        return;
    }
    const allUsers = await collection.find().sort({ name: 1 });
    const allQuery = `SELECT COUNT(*) FROM visits;`;
    const distinctQuery = `SELECT COUNT(DISTINCT ip_address) FROM visits;`;
    const numberAllUsers = await pool.query(allQuery);
    const numberDistinctUsers = await pool.query(distinctQuery);
    res.status(200).json({
        allUsers: allUsers,
        numberAllUsers: numberAllUsers.rows[0].count,
        numberDistinctUsers: numberDistinctUsers.rows[0].count,
    });
};
export default sendUsers;
