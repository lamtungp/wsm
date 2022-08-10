export default {
  get: {
    tags: ['user'],
    description: 'Find an user',
    operationId: 'find-an-user',
    parameters: [
      {
        $ref: '#/components/parameters/AuthToken',
      },
      {
        $ref: '#/components/parameters/Email',
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
