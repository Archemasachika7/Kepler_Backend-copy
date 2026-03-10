import { codingModel } from "../models/coding.model";
import { todayIsNextDate, todayIsSameDay } from "../utils/dateModificationForStreak.utils";
const getCodingDetails = async (req, res) => {
    const emailId = req.body.email;
    const codingData = await codingModel.find({ email: emailId });
    if (codingData.length > 0) {
        const lastSolvedProblem = codingData[0].lastSolved;
        if (!todayIsSameDay(lastSolvedProblem) && !todayIsNextDate(lastSolvedProblem)) {
            codingData[0].streak = 0;
            await codingData[0].save();
        }
    }
    res.status(200).json(codingData[0]);
};
export default getCodingDetails;
