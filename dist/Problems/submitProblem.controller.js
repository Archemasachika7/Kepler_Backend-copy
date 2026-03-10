import languageMapper from "../utils/judge0LanguageMapper";
import { problemSet } from "../problemSet";
import axios from "axios";
import { codeRunnerIP } from "..";
import { codingModel } from "../models/coding.model";
import { todayIsNextDate, todayIsSameDay, findAccepted } from "../utils/dateModificationForStreak.utils";
const submitProblem = async (req, res) => {
    const { code, language, email, name } = req.body;
    const languageCode = languageMapper[language];
    const problem = problemSet.find(val => val.id == new Date().getDate());
    if (!problem) {
        res.status(607).send("No Problem for Today");
        return;
    }
    const hiddenTestCases = problem?.hiddenTestCases || [];
    var errorType = '';
    var hasError = false;
    var index = 1;
    for (const { input, outputReal } of hiddenTestCases) {
        const { data } = await axios.post(`http://${codeRunnerIP}:2358/submissions?base64_encoded=false&wait=true`, {
            source_code: code,
            language_id: languageCode,
            stdin: input
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(data);
        if (!data.stdout || data.stdout != outputReal) {
            hasError = true;
            errorType = data.stderr || data.compile_output || 'Runtime Error';
            break;
        }
        index = index + 1;
    }
    const codingProfile = await codingModel.find({ email: email });
    var streak;
    if (codingProfile.length == 0) {
        const codingData = {
            email: email,
            name: name,
            streak: hasError ? 0 : 1,
            highestStreak: hasError ? 0 : 1,
            lastSolved: new Date(),
            numberSolved: hasError ? 0 : 1,
            submissions: [{
                    name: problem?.name,
                    date: new Date().toLocaleDateString(),
                    difficulty: problem?.difficulty,
                    status: hasError ? 'Rejected' : 'Accepted'
                }],
            keplerBits: hasError ? 0 : 1
        };
        const codingNewData = new codingModel(codingData);
        await codingNewData.save();
        streak = hasError ? 0 : 1;
    }
    else {
        var streakValue = codingProfile[0].streak;
        if (!hasError) {
            if (todayIsNextDate(codingProfile[0].lastSolved)) {
                streakValue = codingProfile[0]?.streak + 1;
            }
            else if (!todayIsSameDay(codingProfile[0].lastSolved)) {
                streakValue = 1;
            }
            else {
                if (!findAccepted(codingProfile[0].submissions)) {
                    streakValue = codingProfile[0]?.streak + 1;
                }
            }
        }
        const heighestStreak = codingProfile[0]?.highestStreak > streakValue ? codingProfile[0].highestStreak : streakValue;
        const numberSolved = hasError ? codingProfile[0].numberSolved : codingProfile[0]?.numberSolved + 1;
        const submissions = [{
                name: problem?.name,
                date: new Date(),
                difficulty: problem?.difficulty,
                status: hasError ? 'Rejected' : 'Accepted'
            }, ...codingProfile[0].submissions];
        const totalBits = hasError ? codingProfile[0].keplerBits : codingProfile[0].keplerBits + 1;
        codingProfile[0].streak = streakValue;
        codingProfile[0].highestStreak = heighestStreak;
        codingProfile[0].numberSolved = numberSolved;
        codingProfile[0].submissions = submissions;
        codingProfile[0].lastSolved = new Date();
        codingProfile[0].keplerBits = totalBits;
        await codingProfile[0].save();
        streak = streakValue;
    }
    if (hasError) {
        res.status(200).json({
            error: true,
            errorType: errorType,
            errorMessage: `Failed on the testCase ${index}`,
            status: 'Rejected',
            streak: streak
        });
        return;
    }
    res.status(200).json({
        error: false,
        errorType: '',
        errorMessage: '',
        status: 'Accepted',
        streak: streak
    });
};
export default submitProblem;
