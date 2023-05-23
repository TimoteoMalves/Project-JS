// import { ref } from "joi";
import mongoose from "mongoose";

const schema = new mongoose.Schema({
    id: Number,
    student: { type: mongoose.Types.ObjectId, ref: "student" },
    enroll_date: Date,
    course: { type: mongoose.Types.ObjectId, ref: "courses" },
    status: Boolean,
}, {collection: 'enrollment'});

const enrollment = mongoose.model('enrollment', schema);

export default enrollment; 