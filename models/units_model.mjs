import { Unit } from "../data/mongo.connection.mjs";

const AddUnit = async (unit_obj) => {
    const unit = new Unit(unit_obj);
    return unit.save();
};

const GetUnit = async (filter, projection, limit) => {
    const query = Unit.find();
    if (Object.keys(filter).length > 0) {
        query.and(filter);
    }
    return query.exec();
};

const UpdateUnit = async (condition, update, options) => {
    return await Unit.findOneAndUpdate(condition, update, options);
};

const DeleteUnit = async (conditions) => {
    return await Unit.deleteOne(conditions);
};

const DeleteUnits = async (conditions) => {
    return await Unit.deleteMany(conditions);
};

export { AddUnit, GetUnit, UpdateUnit, DeleteUnit, DeleteUnits };