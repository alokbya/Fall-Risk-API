import * as users from '../models/users_model.mjs';

const registerNewUser = async () => {
    let user = await users.AddUser({ first_name, last_name, email, title, password: e_pass, dateCreated: new Date() });
    // create user's org
    const org = await orgs_model.AddOrg({
        name: `${first_name}'s org`,
        dateCreated: new Date(),
        admins: [user._id],
        owner: user._id,
    });
    user = await users.UpdateUser({ _id: user._id }, {orgs: [...user.orgs, org] }, { new: true })
    return user;
}