import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    firstName : { type: String, required: true },
    lastName  : { type: String, required: true },
    email     : { type: String, required: true },
    title     : { type: String, required: true },
    password  : { type: String, required: true },
    token     : { type: String, requried: true }
});

export default UsersSchema;