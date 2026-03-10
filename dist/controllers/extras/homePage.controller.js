import { collection } from "../../models/collection.model.js";
import { grouplist } from "../../local_dbs.js";
import pool from "../../utils/postgresConnection.utils.js";
import checkTableExists from "../../postgresModels/checkTableExists.postgres.js";
import axios from "axios";
const homePage = async (req, res) => {
    const allUsers = await collection.countDocuments();
    const allCourses = grouplist.length;
    res.status(200).json({
        users: allUsers,
        courses: allCourses
    });
    try {
        if (await checkTableExists("visits") == false) {
            await import("../../postgresModels/VisitSchema/CreateVisitSchema.postgres.js");
        }
        const ipRaw = req.headers["x-forwarded-for"];
        const ip = ipRaw?.split(",")[0].trim();
        const info = await axios.get(`https://ipinfo.io/${ip}/json?token=c13532365e8939`);
        const query = `INSERT INTO visits (ip_address, country, city, user_agent) values ($1, $2, $3, $4);`;
        await pool.query(query, [ip, info.data.country_name, info.data.city, null]);
        console.log("User entered successfully");
    }
    catch (error) {
        console.log("Error occurred while entering user.", error);
    }
};
export default homePage;
