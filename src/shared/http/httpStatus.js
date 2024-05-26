const HTTP_STATUS = {
    SUCCESS: {
        code: 200,
        message: 'Success.',
    },
    CREATED: {
        code: 201,
        message: 'Resource created.',
    },
    NO_CONTENT: {
        code: 204,
        message: 'Resource created.',
    },
    BAD_REQUEST_ERROR: {
        code: 400,
        message: 'Bad request.',
    },
    UNAUTHORIZED_ERROR: {
        code: 401,
        message: 'Unauthorized error.',
    },
    WRONG_CREDENTIALS_ERROR: {
        code: 402,
        message: 'Wrong Credentials.',
    },
    ACCESS_DENIED_ERROR: {
        code: 403,
        message: 'Access denied.',
    },
    NOT_FOUND_ERROR: {
        code: 404,
        message: 'Not found.',
    },
    METHOD_NOT_ALLOWED_ERROR: {
        code: 404,
        message: 'Not found.',
    },
};

export default HTTP_STATUS;
