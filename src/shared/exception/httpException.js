import HTTP_STATUS from '../http/httpStatus.js';


export class HttpException extends Error {

    constructor({ status, message }) {

        super(message);

        this.status = status;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HttpException);
        }

    }


    static new(payload) {

        return new HttpException(payload);

    }


    throw(payload) {

        throw HttpException.new(payload);

    }

}