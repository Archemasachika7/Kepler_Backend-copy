import talkcollection from "../models/talkcollection.model";
const getComments = async (req, res) => {
    const problem_name = req.body.problem_name;
    const commentData = await talkcollection.find({ group_name: "codingComment", problem_name: problem_name }).sort({ createdAt: -1 });
    res.status(200).json(commentData);
};
export default getComments;
