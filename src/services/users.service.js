import UserModel from '../entities/user.entity.js';
import { isEmpty } from '../shared/utils/tools.js';
import { HttpException } from '../shared/exception/httpException.js';
import HTTP_STATUS from '../shared/http/httpStatus.js';


const UserService = {
    getOne: async function (query) {

        if (isEmpty(query)) HttpException.throw(HTTP_STATUS.BAD_REQUEST_ERROR, 'Missing query on users.')

        return UserModel
            .findOne({ ...query, deleted: false })
            .select('-password')
            .lean();

    },
};

export default UserService;
