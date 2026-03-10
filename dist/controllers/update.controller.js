import { collection } from "../models/collection.model.js";
const updateFunc = async (req, res) => {
    await collection.updateOne({ email: req.body.email }, { $set: { [req.body.old]: req.body.name } });
    const mail = await collection.find({ email: req.body.email });
    const profiles = {
        name: mail[0].name,
        email: mail[0].email,
        phone: mail[0].phone,
    };
    res.status(200).json({
        message: "OK",
        profileInfo: profiles
    });
};
export default updateFunc;
