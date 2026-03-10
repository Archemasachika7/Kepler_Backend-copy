import mongoose from "mongoose";
const detailItem = new mongoose.Schema({
    name: String,
    value: String,
    copy: Boolean,
    color: String,
    salutation: String,
}, { _id: false });
var admittedCoursesSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
    },
    admittedCourses: {
        type: [{
                name: String,
                coursePaymentDate: String,
                upcomingPaymentDate: Date,
                lastDateToPay: Date,
                validity: Date
            }],
        index: true,
    },
    additionalCourses: {
        type: [String],
    },
    appliedAdditionalCourses: {
        type: [String],
    },
    selectedCourses: {
        type: [String],
    },
    transaction_details: {
        type: [detailItem],
    },
    payment_details: {
        type: [detailItem],
    },
    upcoming_payment_details: {
        type: [detailItem],
    },
    log_details: [{
            name: String,
            value1: String,
            value2: String,
            value3: String
        }]
});
export const admittedCoursesModel = mongoose.model("admittedCoursesModel", admittedCoursesSchema);
