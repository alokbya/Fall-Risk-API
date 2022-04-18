import { EpicAudit } from "../data/mongo.connection.mjs";

const AddEpicAudit = async (audit_obj) => {
    const epicAudit = new EpicAudit(audit_obj);
    return epicAudit.save();
}

const GetEpicAudit = async (filter, projection, limit) => {
    const query = EpicAudit.find();
    if (Object.keys(filter).length > 0) {
        query.and(filter);
    }
    return query.exec();
}

const GetEpicAuditByRoomId = async (room_id) => {
    const query = EpicAudit.find();
    query.and({room: room_id});
    return query.exec();
}

const UpdateEpicAudit = async (condition, update, options) => {
    return await EpicAudit.findOneAndUpdate(condition, update, options);
}

const DeleteEpicAudit = async (conditions) => {
    return await EpicAudit.deleteOne(conditions);
}

const DeleteEpicAudits = async (conditions) => {
    return await EpicAudit.deleteMany(conditions);
}

export { AddEpicAudit, GetEpicAudit, GetEpicAuditByRoomId, UpdateEpicAudit, DeleteEpicAudit, DeleteEpicAudits };