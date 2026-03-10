import { admittedCoursesModel } from "../models/admittedCourses.model";
const userInformation = async (req, res) => {
    const email = req.body.email;
    const userDetails = await admittedCoursesModel.find({ email: email });
    if (userDetails.length == 0) {
        res.status(404).send("No Such User");
        return;
    }
    const selectedCourses = userDetails[0].selectedCourses;
    let paymentAmount = 0;
    selectedCourses.forEach((val) => {
        if (val.startsWith("JEE")) {
            paymentAmount += 1000;
        }
        else if (val.startsWith("CAT")) {
            paymentAmount += 3000;
        }
        else if (val.startsWith("GATE")) {
            paymentAmount += 2000;
        }
        else if (val.startsWith("Mathematics And Computer Science")) {
            paymentAmount += 1000;
        }
    });
    res.status(200).json({
        details: userDetails[0],
        amount: paymentAmount
    });
};
export default userInformation;
