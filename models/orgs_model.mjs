import { Org } from "../data/mongo.connection.mjs";

const AddOrg = async (org_obj) => {
    const org = new Org(org_obj);
    return org.save();
}

const GetOrg = async (filter, projection, limit) => {
    const query = Org.find();
    if (Object.keys(filter).length > 0) {
        query.and(filter);
    }
    return query.exec();
}

const UpdateOrg = async (condition, update, options) => {
    return await Org.findOneAndUpdate(condition, update, options);
}

const DeleteOrg = async (conditions) => {
    return await Org.deleteOne(conditions);
}

const DeleteOrgs = async (conditions) => {
    return await Org.deleteMany(conditions);
}

export { AddOrg, GetOrg, UpdateOrg, DeleteOrg, DeleteOrgs }