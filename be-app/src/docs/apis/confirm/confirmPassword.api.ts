export default {
  put: {
    tags: ['user'],
    summary: 'Login before calling this api',
    operationId: 'confirm-reset-password',

    // parameters: [
    //   {
    //     name: 'confirmationCode',
    //     in: 'path',
    //     required: true,
    //     schema: {
    //       type: 'string',
    //     },
    //   },
    // ],

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
