import mongoose from "mongoose";

/********************
    * Orgs Schema
    * -----------
    * name: Organization name
    * dateCreatd: Date Organization was created
    * admins: List of users who can add others to this organization
 *******************/
const OrgsSchema = new mongoose.Schema({
    name        : { type: String, required: true },
    dateCreated : { type: Date, required: true },
    admins      : { type: [mongoose.Schema.Types.ObjectId], ref: 'User', required: true },
    owner       : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export default OrgsSchema;