export const todayIsNextDate = (givenDate) => {
    const PastDate = new Date(givenDate);
    const today = new Date();
    PastDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    PastDate.setDate(PastDate.getDate() + 1);
    return PastDate.getTime() == today.getTime();
};
export const todayIsSameDay = (givenDate) => {
    const PastDate = new Date(givenDate);
    const today = new Date();
    PastDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return PastDate.getTime() == today.getTime();
};
export const findAccepted = (submissions) => {
    for (const it of submissions) {
        const today = new Date();
        const givenDate = new Date(it.date);
        givenDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        if (givenDate.getTime() == today.getTime() && it.status == 'Accepted') {
            return true;
        }
        else if (givenDate != today) {
            break;
        }
    }
    return false;
};
