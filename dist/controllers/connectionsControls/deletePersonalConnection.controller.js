import pool from "../../utils/postgresConnection.utils";
const deletePersonalConnectionController = async (req, res) => {
    const { userEmail, connectionEmail } = req.body;
    try {
        const deleteQuery = `DELETE FROM connectedemailschema WHERE (owneremail = $1 AND connectedemail = $2) OR (owneremail = $2 AND connectedemail = $1)`;
        await pool.query(deleteQuery, [userEmail, connectionEmail]);
        res.status(200).json({
            message: "Connection deleted successfully"
        });
    }
    catch (error) {
        console.log("Error deleting the connection", error);
        res.status(500).json({
            message: "Internal server error while deleting the connection"
        });
    }
};
export default deletePersonalConnectionController;
