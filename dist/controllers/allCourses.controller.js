import { grouplist } from "../local_dbs.js";
const getAllCourses = async (request, res) => {
    const courses = grouplist.filter(data => data.course === true && data.name != 'Community Group').map(data => ({
        name: data.name.replace(/^Computer Science - \s*/, ""),
        exam: data.exam,
        courseId: data._id,
        courseDescription: data.courseDescription,
        features: data.features,
        rating: data.rating,
        image: data.image,
    }));
    res.status(200).json(courses);
};
export default getAllCourses;
