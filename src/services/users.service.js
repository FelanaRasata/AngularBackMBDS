import UserModel from '../entities/user.entity.js';


const UserService = {
    get: async function (query) {

        return UserModel
            .findOne({ ...query, deleted: false })
            .select('-password')
            .lean();

    },
};

export default UserService;
