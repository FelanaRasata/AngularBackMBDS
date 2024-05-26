import HTTP_STATUS from './httpStatus.js';
import Loggeo from '../utils/logger.js';
import { HttpException } from '../exception/httpException.js';


const ApiResponse = {
    success: function (
        {
            code,
            message,
            data,
        },
    ) {

        return {
            status: code ?? HTTP_STATUS.SUCCESS.status,
            data: data ?? null,
            message: message ?? HTTP_STATUS.SUCCESS.message,
        };

    },
    error: function (error) {

        Loggeo.error(error);

        if (error instanceof HttpException)
            return { status: error.status, message: error.message, data: null };

        return {
            ...HTTP_STATUS.BAD_REQUEST_ERROR,
            message: error.message,
            data: null,
        };


    },
};

export default ApiResponse;