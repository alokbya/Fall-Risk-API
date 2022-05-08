import mongoose from "mongoose";

/********************************
    * Epic Question Set Schema
********************************/
const EpicAuditSchema = new mongoose.Schema({
    unit                            : { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },
    payload                         : { type: [Object], required: true },
    dateAdded                       : { type: Date, required: true },
    user                            : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

});

export default EpicAuditSchema;