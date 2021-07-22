export default {
    generalMessage: {
        Error: 'There was some error',
        ApiNotExist: 'Method does not exist',
        success: 'Success',
    },
    httpMessages: {
        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not found',
        409: 'Conflict',
        422: 'Unprocessable Entity',
        500: 'Internal Server Error',
        544: 'Unknown HTTP Error',
    },
    auth: {
        failed: 'Either email or password is incorrect. Please try again',
        customerExists: 'Email Address already in use',
        inactive: 'The account has not been verified',
        customerNotExists: 'The email address you entered does not exist',
        invalidCode: 'Incorrect verification code',
        invalidAction: 'Not Supported',
        invalidToken: 'Token invalid',
    },
    mail: {
        sendError: 'An error occurred while sending mail',
        subject: {
            verificationCode: 'Safe Nourishment verification code',
        },
    },
    admin: {
        country: {
            notFoundCountry: 'Not found country',
            countryNameExist: 'Country name is exist',
            phoneCodeExist: 'Phone code is exist',
            isoCodeExit: 'IsoCode is exist',
            error: 'Have error',
            countryHasReference: 'Country cannot be deleted. Remove all existing references first',
            countryIsExist: 'This value already exists',
        },
    },
};
