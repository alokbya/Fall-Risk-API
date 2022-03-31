import mongoose from "mongoose";

/********************
    * Unit Schema
 *******************/
const UnitsSchema = new mongoose.Schema({
    name : { type: String, required: true },
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export default UnitsSchema;