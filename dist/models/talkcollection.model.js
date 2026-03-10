import mongoose from 'mongoose';
const talkschema = new mongoose.Schema({
    group_name: {
        type: String,
        required: true,
        index: true
    },
    problem_name: {
        type: String,
        index: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
    image: {
        type: String
    },
    image_title: {
        type: String
    },
    date: {
        type: String
    }
}, { timestamps: true });
const talkcollection = mongoose.model('talkcollection', talkschema);
export default talkcollection;
