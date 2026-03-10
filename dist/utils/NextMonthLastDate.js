const getNextPaymentDate = () => {
    const getDate30DaysLater = new Date();
    getDate30DaysLater.setDate(getDate30DaysLater.getDate() + 30);
    return getDate30DaysLater;
};
export default getNextPaymentDate;
