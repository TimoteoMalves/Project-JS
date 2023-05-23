import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    id: Number,
    name: String,
    workload: Number,
    test: String,
    value: Number,
    logo: String,
    professor: { type: mongoose.Types.ObjectId, ref: "professors" },
    status: Boolean
}, {collection: "courses"});

const courses = mongoose.model('courses', schema);

export default courses;