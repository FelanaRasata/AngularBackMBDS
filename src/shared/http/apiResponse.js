import HTTP_STATUS from './httpStatus.js';
import Loggeo from '../utils/logger.js';
import { HttpException } from '../exception/httpException.js';


const ApiResponse = {
    success: function (
        {
            status = HTTP_STATUS.SUCCESS.status,
            data = null,
            overrideMessage = HTTP_STATUS.SUCCESS.message,
        },
    ) {

        return {
            status,
            data,
            message: overrideMessage,
        };

    },
    error: function (error) {

        Loggeo.error(error);

        if (error instanceof HttpException) {

            return { status: error.status, message: error.message, data: null };

        }

        return {
            ...HTTP_STATUS.BAD_REQUEST_ERROR,
            message: error.message,
        };


    },
};

export {
    ApiResponse,
};