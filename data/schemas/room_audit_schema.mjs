import mongoose from "mongoose";

/****************************
    * Question Set Schema
****************************/
const RoomAuditSchema = new mongoose.Schema({
    name                            : { type: String, required: true },
    room                            : { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    doorJamMarker                   : { type: Boolean, required: true },
    whiteboardAdjusted              : { type: Boolean, required: true },
    yellowSocksOrShoes              : { type: Boolean, required: true },
    threeSideRails                  : { type: Boolean, required: true },
    chairAlarmOnZeroSeconds         : { type: Boolean, required: true },
    threeCordsForChairAlarm         : { type: Boolean, required: true },
    bedAlarm                        : { type: Boolean, required: true }
});

export default RoomAuditSchema;