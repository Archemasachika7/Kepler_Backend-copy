import { admittedCoursesModel } from "../../models/admittedCourses.model.js";
const applyCourses = async (req, res) => {
    console.log(req.body);
    const { selectedCourses, email, additionalCoursesSelected } = req.body;
    try {
        const userData = await admittedCoursesModel.findOne({ email: email });
        let isInValid = false;
        const admittedCourses = userData?.admittedCourses;
        const admittedNames = admittedCourses?.map(course => course.name);
        const selectedSet = new Set(selectedCourses);
        const admittedMap = new Map(admittedCourses?.map((course) => [course.name, course.upcomingPaymentDate]));
        if (admittedMap.size > 0) {
            for (const [name, date] of admittedMap) {
                const today = new Date();
                const upcomingDate = date;
                today.setHours(0, 0, 0, 0);
                upcomingDate.setHours(0, 0, 0, 0);
                if (selectedSet.has(name) && today < upcomingDate) {
                    isInValid = true;
                    break;
                }
            }
        }
        if (isInValid) {
            res.status(303).send("Remove Duplicate Courses");
            return;
        }
        if (userData != null) {
            await admittedCoursesModel.updateOne({ email: email }, { $set: { selectedCourses: selectedCourses, appliedAdditionalCourses: additionalCoursesSelected } });
        }
        else {
            const data = new admittedCoursesModel(req.body);
            await data.save();
        }
        res.status(200).json({
            message: "Updated",
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    }
};
export default applyCourses;
