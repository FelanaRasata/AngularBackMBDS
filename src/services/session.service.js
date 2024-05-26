import jwt from 'jsonwebtoken';
import { isEmpty } from '../shared/utils/tools.js';
import ExceptionService from './exception.service.js';
import { API_SECRET_KEY, API_TOKEN_EXPIRATION } from '../config/apiServer.config.js';
import UsersService from './users.service.js';
import HTTP_STATUS from '../shared/http/httpStatus.js';


const SessionServie = {
    retrieveToken: function (req) {

        const authorization = req.header('Authorization').split('Bearer ')[1] || null;

        if (isEmpty(authorization)) {
            ExceptionService.throwHTTPError(HTTP_STATUS.UNAUTHORIZED_ERROR);
        }

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
    signIn: async function ({ username, password }) {


        if (isEmpty(username) || isEmpty(password)) ExceptionService.throwHTTPError(HTTP_STATUS.WRONG_CREDENTIALS_ERROR);

        const user = await UsersService.get({ username });

        if (isEmpty(user)) ExceptionService.throwHTTPError(HTTP_STATUS.WRONG_CREDENTIALS_ERROR);

        const isMatching = await user.comparePassword(String(password));

        if (!isMatching) ExceptionService.throwHTTPError(HTTP_STATUS.WRONG_CREDENTIALS_ERROR);

        const token = this.generateToken({ userId: user._id }, API_TOKEN_EXPIRATION);

        return { token: token, userRole: user.role };


    },
    isStrongPassword: function (password) {

        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return password.length >= minLength && hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;

    },
};

export default SessionServie;
