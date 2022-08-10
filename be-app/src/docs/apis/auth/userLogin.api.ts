export default {
  post: {
    tags: ['user'],
    summary: 'Login before calling other api',
    operationId: 'user-login',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              email: 'lampt2404@gmail.com',
              password: '123456',
            },
          },
        },
      },
    },
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
