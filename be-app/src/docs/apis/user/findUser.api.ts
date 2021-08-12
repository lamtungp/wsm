export default {
  get: {
    tags: ['user'],
    description: 'Find an user',
    operationId: 'find-an-user',
    parameters: [
      { $ref: '#/components/parameters/AuthToken' },
      {
        name: 'email',
        in: 'query',
        required: true,
        description: 'The email that needs to be fetched. Use a user for testing.',
        schema: {
          type: 'string',
          example: 'lamtung2404@gmail.com',
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
