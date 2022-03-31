import mongoose from 'mongoose';

/************************
    * Blacklist Schema
************************/
const BlacklistSchema = new mongoose.Schema({
    token: { type: String, required: true }
});

export default BlacklistSchema;