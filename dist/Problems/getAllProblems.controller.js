import { problemSet } from "../problemSet";
import { codingModel } from "../models/coding.model";
const getAllProblems = async (req, res) => {
    const email = req.body.emailId;
    const filter = req.body.filter ?? [];
    const problemLevel = req.body.problemLevel ?? [];
    try {
        const { problemName } = req.params;
        var problem = problemSet;
        if (problemName) {
            problem = problemSet.filter(p => p.name.toLowerCase().includes(problemName.toLowerCase()));
        }
        if (filter.length > 0) {
            problem = problem.filter(p => filter.includes(p.difficulty));
        }
        if (problemLevel.length > 0) {
            const normalizedLevels = problemLevel.map(val => val.toLowerCase());
            problem = problem.filter(p => p.topics.some((topic) => normalizedLevels.includes(topic.toLowerCase())));
        }
        const modifiedProblems = problem.map((problem, index) => {
            const { hiddenTestCases, inputFormat, outputFormat, displayTestCases, realTestCases, description, constraintsSpace, constraintsTime, ...problemFields } = problem;
            return problemFields;
        });
        const dailyProblem = modifiedProblems.find(problem => problem.id == new Date().getDate());
        const codingDetails = await codingModel.find({ email: email });
        const streakValue = codingDetails[0]?.streak || 0;
        const keplerBits = codingDetails[0]?.keplerBits || 0;
        const solved = codingDetails[0]?.numberSolved || 0;
        res.status(200).json({
            problemList: modifiedProblems,
            dailyProblem: dailyProblem,
            streak: streakValue,
            keplerBits: keplerBits,
            solved: solved
        });
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
        console.log(err);
    }
};
export default getAllProblems;
