import mongoose from "mongoose";

const RoomsSchema = new mongoose.Schema({
    name : { type: String, required: true },
    unit : { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true }
});

export default RoomsSchema;