import { RoomAudit } from "../data/mongo.connection.mjs";

const AddRoomAudit = async (audit_obj) => {
    const roomAudit = new RoomAudit(audit_obj);
    return roomAudit.save();
}

const GetRoomAudit = async (filter, projection, limit) => {
    const query = RoomAudit.find();
    if (Object.keys(filter).length > 0) {
        query.and(filter);
    }
    return query.exec();
}

const GetRoomAuditByRoomId = async (room_id) => {
    const query = RoomAudit.find();
    query.and({room: room_id});
    return query.exec();
}

const UpdateRoomAudit = async (condition, update, options) => {
    return await RoomAudit.findOneAndUpdate(condition, update, options);
}

const DeleteRoomAudit = async (conditions) => {
    return await RoomAudit.deleteOne(conditions);
}

const DeleteRoomAudits = async (conditions) => {
    return await RoomAudit.deleteMany(conditions);
}

export { AddRoomAudit, GetRoomAudit, GetRoomAuditByRoomId, UpdateRoomAudit, DeleteRoomAudit, DeleteRoomAudits };