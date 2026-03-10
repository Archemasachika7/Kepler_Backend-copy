import { Request, Response } from "express";
import { collection } from "../../models/collection.model";
import { grouplist } from "../../local_dbs";
import pool from "../../utils/postgresConnection.utils";
import checkTableExists from "../../postgresModels/checkTableExists.postgres";
import axios from "axios";
import { sendRegistrationEmail } from "../../utils/mailsend.utils";
import config from "../../config";

interface IPInterface {
    country_name: string,
    city: string
}

const homePage = async(req:Request, res:Response) => {
    const allUsers = await collection.countDocuments();
    const allCourses = grouplist.length;
    res.status(200).json({
        users: allUsers,
        courses: allCourses
    })
    try{
        if(await checkTableExists("visits") == false){
            await import("../../postgresModels/VisitSchema/CreateVisitSchema.postgres");
        }
        const ipRaw = req.headers["x-forwarded-for"];
        const ip = ipRaw?.split(",")[0].trim();
        const ipInfoToken = config.IPINFO_TOKEN || "";
        const info = await axios.get(`https://ipinfo.io/${ip}/json?token=${ipInfoToken}`)
        const query = `INSERT INTO visits (ip_address, country, city, user_agent) values ($1, $2, $3, $4);`;
        await pool.query(query, [ip, info.data.country_name, info.data.city, null])
    }
    catch (error) {
        console.log("Error occurred while entering user.");
    }
}
export default homePage