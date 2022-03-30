import { Room } from "../data/mongo.connection.mjs";

const AddRoom = async (room_obj) => {
    const room = new Room(room_obj);
    return room.save();
};

const GetRoom = async (filter, projection, limit) => {
    const query = Room.find();
    if (Object.keys(filter).length > 0) {
        query.and(filter);
    }
    return query.exec();
};

const GetRoomByUnitId = async (unit_id) => {
    const query = Room.find();
    query.and({unit: unit_id});
    query.exec();
};

const UpdateRoom = async (condition, update, options) => {
    return await Room.findOneAndUpdate(condition, update, options);
};

const DeleteRoom = async (conditions) => {
    return await Room.deleteOne(conditions);
};

const DeleteRooms = async (conditions) => {
    return await Room.deleteMany(conditions);
};

export { AddRoom, GetRoom, GetRoomByUnitId, UpdateRoom, DeleteRoom, DeleteRooms };