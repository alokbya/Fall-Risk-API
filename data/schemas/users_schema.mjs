import mongoose from "mongoose";

/********************
    * User Schema
 *******************/
const UsersSchema = new mongoose.Schema({
    first_name : { type: String, required: true },
    last_name  : { type: String, required: true },
    email     : { type: String, required: true },
    title     : { type: String, required: true },
    password  : { type: String, required: true },
    token     : { type: String, requried: true },
    units     : {type: [mongoose.Schema.Types.ObjectId], ref: 'Unit', required: false},
});

export default UsersSchema;