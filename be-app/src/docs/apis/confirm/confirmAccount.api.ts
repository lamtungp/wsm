export default {
  put: {
    tags: ['user'],
    summary: 'Please create a account before calling this api',
    operationId: 'confirm-account',

    parameters: [
      {
        name: 'confirmationCode',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],

    responses: {
      '200': {
        description: 'OK',
      },
      '400': {
        description: 'Bad Request Error',
      },
      '500': {
        description: 'Internal Server Error',
      },
    },
  },
};
