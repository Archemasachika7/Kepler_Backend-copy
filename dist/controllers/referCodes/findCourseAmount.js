export class FindCourseReferralAmount {
    constructor() {
    }
}
FindCourseReferralAmount.referralAmounts = {
    OneCourseWithoutPlacement: 146,
    TwoCoursesWithoutPlacement: 292,
    ThreeCoursesWithoutPlacement: 438,
    FourCoursesWithoutPlacement: 584,
    ThreeCoursesWithPlacement: 366,
    FourCoursesWithPlacement: 489
};
FindCourseReferralAmount.findAmount = ({ courseList, additionalCourses }) => {
    if (!courseList.includes('Computer Science - Placements Made Easier')) {
        if (courseList.length == 2) {
            return FindCourseReferralAmount.referralAmounts.TwoCoursesWithoutPlacement;
        }
        else if (courseList.length == 3) {
            return FindCourseReferralAmount.referralAmounts.ThreeCoursesWithPlacement;
        }
        else if (courseList.length == 4) {
            return FindCourseReferralAmount.referralAmounts.FourCoursesWithPlacement;
        }
        else {
            return FindCourseReferralAmount.referralAmounts.OneCourseWithoutPlacement;
        }
    }
    else if (additionalCourses.length == 2) {
        return FindCourseReferralAmount.referralAmounts.FourCoursesWithPlacement;
    }
    else if (additionalCourses.length == 1) {
        return FindCourseReferralAmount.referralAmounts.ThreeCoursesWithPlacement;
    }
    return FindCourseReferralAmount.referralAmounts.OneCourseWithoutPlacement;
};
