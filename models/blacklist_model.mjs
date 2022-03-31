import { Blacklist } from '../data/mongo.connection.mjs'

const AddToken = async (token) => {
    const b_token = new Blacklist({ token });
    return b_token.save();
}

const GetToken = async (filter, projection, limit) => {
    const query = Blacklist.find();
    if (Object.keys(filter).length > 0) {
        query.and(filter);
    }
    return query.exec();
}

export { AddToken, GetToken }