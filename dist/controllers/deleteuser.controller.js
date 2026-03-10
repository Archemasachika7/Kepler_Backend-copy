import { collection } from "../models/collection.model.js";
import { admittedCoursesModel } from "../models/admittedCourses.model.js";
import { codingModel } from "../models/coding.model.js";
const deleteFunc = async (req, res) => {
    const emailId = req.body.email;
    await collection.deleteOne({ email: emailId });
    await admittedCoursesModel.deleteOne({ email: emailId });
    await codingModel.deleteOne({ email: emailId });
    res.status(200).send("Deleted");
};
export default deleteFunc;
