import { admittedCoursesModel } from "../models/admittedCourses.model.js";
import { playlistData } from "../playlists.js";
import { grouplist } from "../local_dbs.js";
const getPlayListVideos = async (req, res) => {
    const { emailId, examName } = req.body;
    const userDetails = await admittedCoursesModel.findOne({ email: emailId });
    if (!userDetails) {
        res.status(405).json({
            message: "User has not purchased any course"
        });
        return;
    }
    const admittedCourses = userDetails?.admittedCourses;
    if (!admittedCourses || admittedCourses.length == 0) {
        res.status(405).json({
            message: "User has not purchased any courses"
        });
        return;
    }
    const courseFullName = grouplist.find(data => data.exam == examName)?.name;
    if (!courseFullName) {
        res.status(406).json({
            message: "Invalid Exam Name"
        });
        return;
    }
    const courseNames = admittedCourses.map((course) => course.name);
    var playList = [];
    if (courseNames.includes("Computer Science - Placements Made Easier") && ["fundamentals", "webdev", "dsa"].includes(examName)) {
        playList = playlistData[examName];
    }
    else if (courseNames.includes(courseFullName)) {
        playList = playlistData[examName];
    }
    else {
        res.status(400).json({
            message: "User does not have access to this course"
        });
        return;
    }
    res.status(200).json({
        playlist: playList,
        message: "PlayList found successfully"
    });
};
export default getPlayListVideos;
