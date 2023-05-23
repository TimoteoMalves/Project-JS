import mongoose from "mongoose";


const schema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    biografy: String,
    expertise: String,
    git_hub: String,
    password: String,
    linkedin: String,
    status: Boolean,
    role: String,
}, {collection: 'professors'});

const professors = mongoose.model('professors', schema);

export default professors;