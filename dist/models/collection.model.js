import mongoose from "mongoose";
var Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    education_type: {
        type: String
    },
    college: {
        type: String,
    },
    college_stream: {
        type: String,
    },
    college_year: {
        type: String,
    },
    college_department: {
        type: String,
    },
    school: {
        type: String,
    },
    school_year: {
        type: String,
    },
    work_country: {
        type: String
    },
    work_state: {
        type: String
    },
    work_city: {
        type: String
    },
    work_company: {
        type: String
    },
    work_position: {
        type: String
    },
    work_duration: {
        type: String
    },
    refercode: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    usenumber: {
        type: Number,
        required: true,
    },
    isvalid: {
        type: Number,
        required: true,
    },
    paidAmount: {
        type: Boolean,
    },
    referrer_refer_code: {
        type: String,
        required: true,
        default: "NULL",
    }
});
export const collection = mongoose.model("collection", Schema);
