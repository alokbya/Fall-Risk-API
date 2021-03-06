import mongoose from 'mongoose';
import dotenv from 'dotenv';

/**********************
    * Import Schemas
**********************/
import QuestionSetSchema from './schemas/question_set_schema.mjs';
import RoomsSchema from './schemas/rooms_schema.mjs';
import UnitsSchema from './schemas/units_schema.mjs';
import UsersSchema from './schemas/users_schema.mjs';
import BlacklistSchema from './schemas/blacklist_schema.mjs';
import OrgsSchema from './schemas/orgs_schema.mjs';
import EpicAuditSchema from './schemas/epic_audit_schema.mjs';
import RoomAuditSchema from './schemas/room_audit_schema.mjs';

/*********************
    * Configure DB
*********************/
dotenv.config();

const mongo_uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}.owb95.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

// identify db to connect
mongoose.connect(
    mongo_uri,
    { useNewUrlParser: true },
);

// connect to db
const db = mongoose.connection;
db.once('open', () => {
    console.log(`Successfully connected to ${process.env.MONGO_DB_NAME} using Mongoose.`);
});

/***********************
    * Generate models
***********************/
const QuestionSet = mongoose.model('QuestionSet', QuestionSetSchema);
const Room = mongoose.model('Room', RoomsSchema);
const Unit = mongoose.model('Unit', UnitsSchema);
const User = mongoose.model('User', UsersSchema);
const Blacklist = mongoose.model('Blacklist', BlacklistSchema);
const Org = mongoose.model('Org', OrgsSchema);
const EpicAudit = mongoose.model('EpicAudit', EpicAuditSchema);
const RoomAudit = mongoose.model('RoomAudit', RoomAuditSchema);

export { QuestionSet, Room, Unit, User, Blacklist, Org, EpicAudit, RoomAudit };