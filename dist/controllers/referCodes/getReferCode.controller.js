import { collection } from "../../models/collection.model.js";
const getReferCode = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await collection.find({
            email: email,
        });
        if (user.length == 0) {
            res.status(404).json({
                message: "User not found",
            });
            return;
        }
        const referCode = user[0].refercode;
        const numberLeft = user[0].usenumber;
        const isValid = user[0].isvalid;
        if (isValid == 0) {
            res.status(400).json({
                message: "Refer code is not valid",
            });
            return;
        }
        res.status(200).json({
            referCode: referCode,
            numberLeft: numberLeft,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
};
export default getReferCode;
