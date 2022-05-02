import mongoose from "mongoose";

/********************
    * User Schema
 *******************/
const UsersSchema = new mongoose.Schema({
    first_name  : { type: String, required: true },
    last_name   : { type: String, required: true },
    email       : { type: String, required: true },
    title       : { type: String, required: true },
    role        : { type: String, required: true, default: 'associate'},
    password    : { type: String, required: true },
    token       : { type: String, requried: true },
    orgs        : { type: [mongoose.Schema.Types.ObjectId], ref: 'Org', required: false},
    units       : { type: [mongoose.Schema.Types.ObjectId], ref: 'Unit'},
    dateCreated : { type : Date, required: true }
});

export default UsersSchema;