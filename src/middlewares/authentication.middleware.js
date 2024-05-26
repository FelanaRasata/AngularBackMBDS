import pkg from 'jsonwebtoken';
import SessionService from '../services/session.service.js';
import { isEmpty } from '../shared/utils/tools.js';
import UsersService from '../services/users.service.js';
import { HTTP_STATUS } from '../shared/http/apiResponse.js';
import Loggeo from '../shared/utils/logger.js';
import { HttpException } from '../shared/exception/httpException.js';


const { JsonWebTokenError } = pkg;


export const authenticate = async (request, response, next) => {

    try {

        const verificationResponse = await SessionService.retrieveTokenData(request);
        const userId = verificationResponse.userId;
        const foundUser = await UsersService.get({ _id: userId });

        if (!isEmpty(foundUser)) {

            request.user = foundUser;
            next();

        } else {

            next(HttpException.new(HTTP_STATUS.UNAUTHORIZED_ERROR));

        }

    } catch (error) {

        Loggeo.error(error);

        if (error instanceof JsonWebTokenError) {
            next(HttpException.new({ ...HTTP_STATUS.UNAUTHORIZED_ERROR, message: 'Session expired' }));
        } else {
            next(HttpException.new(HTTP_STATUS.UNAUTHORIZED_ERROR));
        }

    }

};