import { User } from "../data/mongo.connection.mjs";

const AddUser = async (user_obj) => {
    const user = new User(user_obj);
    return user.save();
};

const GetUser = async (filter, projection, limit) => {
    const query = User.find();
    if (Object.keys(filter).length > 0)
    {
        query.and(filter);
    }
    return query.exec();
};

const UpdateUser = async (condition, update, options) => {
    return await User.findOneAndUpdate(condition, update, options);
};

const DeleteUser = async (conditions) => {
    return await User.deleteOne(conditions);
};

export { AddUser, GetUser, UpdateUser, DeleteUser };