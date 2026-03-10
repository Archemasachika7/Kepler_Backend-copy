import { collection } from "../../models/collection.model.js";
import { redis } from "../../index.js";
import getUserInformationFromReferCode from "./GetUserInfoFromReferCode.controller.js";
import { FindCourseReferralAmount } from "./findCourseAmount.js";
const sendPendingReferralInformation = async (req, res) => {
    const emailId = req.body.emailId;
    const referralCode_giver = await collection.findOne({ email: emailId });
    if (!referralCode_giver) {
        res.status(404).json({
            message: "User not found",
        });
        return;
    }
    const referrals = await redis.get(referralCode_giver.refercode);
    if (!referrals) {
        res.status(200).json({
            message: "No referrals found for this user",
            referralsList: [],
        });
        return;
    }
    const parsedReferralList = JSON.parse(referrals || '[]');
    const responseList = [];
    for (const referral of parsedReferralList) {
        const courseList = referral.coursesBought;
        const additionalCourses = referral.additionalCourses;
        const amount = FindCourseReferralAmount.findAmount({ courseList, additionalCourses });
        const referralUserInfo = await getUserInformationFromReferCode(referral.referralCode_taker[0].refercode);
        if (referralUserInfo) {
            responseList.push({ ...referralUserInfo,
                dateReferred: referral.dateReferred,
                amount: amount
            });
        }
    }
    res.status(200).json({
        referralsList: responseList,
        message: "Referrals details fetched successfully",
    });
};
export default sendPendingReferralInformation;
