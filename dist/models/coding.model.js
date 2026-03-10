import mongoose from "mongoose";
var codingSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true,
    },
    streak: {
        type: Number,
    },
    highestStreak: {
        type: Number
    },
    lastSolved: {
        type: Date
    },
    numberSolved: {
        type: Number,
    },
    submissions: [{
            name: String,
            date: Date,
            difficulty: String,
            time: String,
            memory: Number,
            status: String
        }],
    keplerBits: {
        type: Number
    }
});
export const codingModel = mongoose.model('codingModel', codingSchema);
