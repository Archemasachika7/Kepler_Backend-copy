import { codingModel } from "../models/coding.model";
const getLeaderboardDetails = async (req, res) => {
    const email = req.body.email;
    const combinedModel = await codingModel.aggregate([
        {
            $lookup: {
                from: "collections",
                localField: 'email',
                foreignField: 'email',
                as: 'userInfo'
            }
        },
        {
            $unwind: "$userInfo"
        },
        {
            $sort: {
                numberSolved: -1,
            }
        },
        {
            $project: {
                name: 1,
                email: 1,
                numberSolved: 1,
                streak: 1,
                highestStreak: 1,
                keplerBits: 1,
                college: "$userInfo.college",
                school: "$userInfo.school"
            }
        }
    ]);
    const overallRank = combinedModel.findIndex(user => user.email == email) + 1;
    const user = combinedModel.find(user => user.email == email);
    const college = user?.college || "";
    const school = user?.school || "";
    const instituteList = combinedModel.filter(user => college ? user.college == college : user.school == school);
    const instituteRank = instituteList.findIndex(user => user.email == email) + 1;
    const param = req.query.param || "";
    const filteredList = combinedModel.filter(user => user.name.toLowerCase().includes(param.toLowerCase()) || (college ? user.college.toLowerCase().includes(param.toLowerCase()) : (user?.school ? user?.school.toLowerCase().includes(param.toLowerCase()) : '')));
    res.status(200).json({
        instituteRank: instituteRank,
        overallRank: overallRank,
        rankList: filteredList,
    });
};
export default getLeaderboardDetails;
