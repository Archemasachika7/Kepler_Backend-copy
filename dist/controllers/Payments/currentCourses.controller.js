import { admittedCoursesModel } from "../../models/admittedCourses.model.js";
import { grouplist } from "../../local_dbs.js";
const currentCoursesFetch = async (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    try {
        const userData = await admittedCoursesModel.findOne({ email: email });
        const allPossibleCourses = grouplist?.filter(data => data.course == true && data.name != 'Community Group').map(data => { return { name: data.name, price: data.price }; }) || [];
        console.log(userData);
        const admittedCourses = userData?.admittedCourses || [];
        let selectedCourses = userData?.selectedCourses || [];
        let onGoingCourses = [];
        let currentCourses = [];
        let preventedCourses = [];
        admittedCourses.forEach((val) => {
            if (val?.name?.startsWith("Computer Science")) {
                currentCourses.push(val.name);
            }
            if (new Date() >= val?.upcomingPaymentDate && new Date() <= val?.lastDateToPay) {
                if (!selectedCourses.includes(val.name)) {
                    selectedCourses.push(val.name);
                }
            }
            else if (new Date() < val?.upcomingPaymentDate) {
                preventedCourses.push(val.name);
            }
        });
        if (preventedCourses.length > 0 && preventedCourses.includes("Computer Science - Placements Made Easier")) {
            preventedCourses = ["Computer Science - DSA for Placement and Contests", "Computer Science - Artificial Intelligence: Explore the Future", "Computer Science - Development Crash Course: Projects Made Easier", "Computer Science - Fundamentals Course: Crack GATE With Ease", "Computer Science - Placements Made Easier"];
        }
        else if (preventedCourses.length > 0 && !preventedCourses.includes("Computer Science - Placements Made Easier")) {
            if (!preventedCourses.includes("Computer Science - Placements Made Easier")) {
                preventedCourses.push("Computer Science - Placements Made Easier");
            }
        }
        // have to remove these following lines 52 - 55, on 31st March 2026
        if (!preventedCourses.includes("Computer Science - Artificial Intelligence: Explore the Future")) {
            preventedCourses.push("Computer Science - Artificial Intelligence: Explore the Future");
        }
        selectedCourses.forEach((val) => {
            if (val.startsWith("Computer Science")) {
                const price = grouplist.find(data => data.name == val)?.price || 0;
                onGoingCourses.push({ name: val, salutation: "INR", value: price });
            }
        });
        res.status(201).json({
            admittedCourses: currentCourses,
            selectedCourses: onGoingCourses,
            preventedCourses: preventedCourses,
            allPossibleCourses: allPossibleCourses
        });
    }
    catch (err) {
        console.log(err);
        res.status(493).send("Failed to Send Courses");
    }
};
export default currentCoursesFetch;
