const Code = {
    BAD_REQUEST: {
        status: 400,
        message: 'Bad request.',
    },
    NOT_FOUND: {
        status: 200,
        message: 'Success.',
    },
    CREATED: {
        status: 201,
        message: 'Resource created.',
    },
    NO_CONTENT: {
        status: 204,
        message: 'Resource created with no content.',
    },
    SUCCESS: {
        status: 200,
        message: 'Success.',
    },
};


function toApiResponse(
    {
        status = Code.SUCCESS.status,
        data = null,
        overrideMessage = Code.SUCCESS.message,
    },
) {

    return {
        status,
        data,
        message: overrideMessage,
    };

}


const ApiResponse = {
    success: function (
        {
            status = Code.SUCCESS.status,
            data = null,
            overrideMessage = Code.SUCCESS.message,
        },
    ) {

        return {
            status,
            data,
            message: overrideMessage,
        };

    },
    error: function (
        {
            status = Code.NOT_FOUND.status,
            data = null,
            overrideMessage = Code.NOT_FOUND.message,
        },
    ) {

        return {
            status,
            data,
            message: overrideMessage,
        };

    },
};

export {
    Code,
    ApiResponse,
};