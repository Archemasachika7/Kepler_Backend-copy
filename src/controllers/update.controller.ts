import { Request, Response } from "express";
import { collection } from "../models/collection.model.js";

const ALLOWED_UPDATE_FIELDS = ["name", "phone", "country", "state", "city", "education_type", "college", "college_stream", "college_year", "college_department", "school", "school_year", "work_country", "work_state", "work_city", "work_company", "work_position", "work_duration"];

const updateFunc = async(req: Request, res: Response)=>{
    const field = req.body.old;
    if (!field || typeof field !== "string" || !ALLOWED_UPDATE_FIELDS.includes(field)) {
        res.status(400).json({ message: "Invalid field name" });
        return;
    }
    await collection.updateOne({email: req.body.email}, {$set: {[field] : req.body.name}});
    const mail = await collection.find({email: req.body.email});
    const profiles = {
        name: mail[0].name,
        email: mail[0].email,
        phone: mail[0].phone,
    }
    res.status(200).json({
        message: "OK",
        profileInfo: profiles
    });
}
export default updateFunc;