import { QuestionSet } from "../data/mongo.connection.mjs";

const AddQuestionSet = async (qs_obj) => {
    const questionSet = new QuestionSet(qs_obj);
    return questionSet.save();
};

const GetQuestionSet = async (filter, projection, limit) => {
    const query = QuestionSet.find();
    if (Object.keys(filter).length > 0) {
        query.and(filter);
    }
    return query.exec();
};

const GetQuestionSetByRoomId = async (room_id) => {
    const query = QuestionSet.find();
    query.and({room: room_id});
    return query.exec();
};

const UpdateQuestionSet = async (condition, update, options) => {
    return await QuestionSet.findOneAndUpdate(condition, update, options);
}

const DeleteQuestionSet = async (conditions) => {
    return await QuestionSet.deleteOne(conditions);
};

const DeleteQuestionSets = async (conditions) => {
    return await QuestionSet.deleteMany(conditions);
};

export { AddQuestionSet, GetQuestionSet, GetQuestionSetByRoomId, UpdateQuestionSet, DeleteQuestionSet, DeleteQuestionSets };