import { grouplist } from '../../local_dbs.js';
import { executive_emails } from '../../local_dbs.js';
import { core_emails } from '../../local_dbs.js';
import { teacher_emails } from '../../local_dbs.js';
import { admittedCoursesModel } from '../../models/admittedCourses.model.js';
const takeNumber = async (req, res) => {
    let newList = grouplist.sort((a, b) => a.name.localeCompare(b.name));
    const email = req.body.email;
    const data = await admittedCoursesModel.findOne({ email: email });
    const groups = data?.admittedCourses.map((val) => val.name) || [];
    if (!executive_emails.includes(email) && !core_emails.includes(email) && !teacher_emails.includes(email)) {
        newList = newList.filter((group) => group.name == "Community Group" ? true : groups.includes(group.name) && group.visibility == 'none');
    }
    if (!executive_emails.includes(email)) {
        newList = newList.filter((group_name) => group_name.name !== 'Executive Group');
    }
    if (groups.includes("Computer Science - Placements Made Easier")) {
        newList = grouplist.filter(group => group.course == true).filter((group_name) => group_name.name !== "Computer Science - Artificial Intelligence: Explore the Future" &&
            group_name.name !== "Computer Science - Placements Made Easier");
    }
    res.status(200).json({
        list: newList
    });
};
export default takeNumber;
