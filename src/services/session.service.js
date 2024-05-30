import jwt from 'jsonwebtoken';
import { isEmpty } from '../shared/utils/tools.js';
import { API_SECRET_KEY, API_TOKEN_EXPIRATION } from '../config/apiServer.config.js';
import HTTP_STATUS from '../shared/http/httpStatus.js';
import { HttpException } from '../shared/exception/httpException.js';
import UserModel from '../entities/user.entity.js';


const SessionService = {
    retrieveToken: function (req) {

        const authorization = req.header('Authorization')?.split('Bearer ')[1];

        if (isEmpty(authorization))
            HttpException.throw(HTTP_STATUS.UNAUTHORIZED_ERROR);

        return authorization;

    },
    retrieveTokenData: function (req) {

        const token = this.retrieveToken(req);

        return this.verifyToken(token);

    },
    generateToken: function (tokenData, expiresIn) {

        return jwt.sign(tokenData, API_SECRET_KEY, { expiresIn });

    },
    verifyToken: function (token) {

        return jwt.verify(token, API_SECRET_KEY);

    },
    signIn: async function ({ username, password, role }) {


        if (isEmpty(username) || isEmpty(password)) HttpException.throw(HTTP_STATUS.WRONG_CREDENTIALS_ERROR, 'Missing credentials');

        const user = await UserModel
            .findOne({ username, role, deleted: false });

        if (isEmpty(user)) HttpException.throw(HTTP_STATUS.WRONG_CREDENTIALS_ERROR, 'No user found');

        const isMatching = await user.comparePassword(String(password));

        if (!isMatching) HttpException.throw(HTTP_STATUS.WRONG_CREDENTIALS_ERROR, 'Password not matching');

        const token = this.generateToken({ userId: user._id }, API_TOKEN_EXPIRATION);

        return { token: token, userRole: user.role };

    },
};

export default SessionService;
