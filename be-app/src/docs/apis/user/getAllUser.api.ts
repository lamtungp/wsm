export default {
  get: {
    tags: ['user'],
    description: 'Get all user',
    operationId: 'get-all-user',
    parameters: [
      {
        $ref: '#/components/parameters/AuthToken',
      },
    ],
    responses: {
      '200': {
        description: 'OK',
      },
      '400': {
        description: 'Bad Request Error',
      },
      '401': {
        description: 'Unauthorized Error',
      },
      '404': {
        description: 'Not Found Error',
      },
      '500': {
        description: 'Internal Server Error',
      },
    },
  },
};
