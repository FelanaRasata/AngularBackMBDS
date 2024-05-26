export class HttpException extends Error {

    constructor({ code, message }) {

        super(message);

        this.status = code;

        if (Error.captureStackTrace)
            Error.captureStackTrace(this, HttpException);

    }


    static new(payload, overrideMessage = null) {

        return new HttpException({ payload, message: overrideMessage ?? payload.message });

    }


    static throw(payload, overrideMessage = null) {

        throw HttpException.new(payload, overrideMessage);

    }

}