import { collection } from "../../models/collection.model.js";
const checkReferCodeExists = async (req, res) => {
    const { email, referCode } = req.body;
    const referCodeDetails = await collection.find({ refercode: referCode });
    if (referCodeDetails.length == 0) {
        res.status(400).json({
            message: "Invalid Refer Code"
        });
        return;
    }
    if (referCodeDetails[0].email == email) {
        res.status(400).json({
            message: "Invalid Refer Code"
        });
        return;
    }
    res.status(200).json({
        message: "ReferCode Found"
    });
};
export default checkReferCodeExists;
