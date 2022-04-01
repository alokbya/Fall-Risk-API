import mongoose from "mongoose";

/********************
    * Unit Schema
 *******************/
const UnitsSchema = new mongoose.Schema({
    name        : { type: String, required: true },
    org         : { type: mongoose.Schema.Types.ObjectId, ref: 'Org', required: true },
    dateCreated : { type: Date, required: true }
});

export default UnitsSchema;