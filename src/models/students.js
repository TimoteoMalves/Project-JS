import mongoose from "mongoose";

const schema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    cpf: String,
    phone: String,
    password: String,
    course: String,
    status: Boolean,
    role: String,
}, {collection:'students'});

const students = mongoose.model('students', schema);

export default students;