export default {
  get: {
    tags: ['user'],
    description: 'Get list staff with role is user',
    operationId: 'get-list-staff',
    parameters: [
      { $ref: '#/components/parameters/AuthToken' },
      {
        name: 'email',
        in: 'query',
        required: true,
        description: 'The email that needs to be fetched. Use an user for testing.',
        schema: {
          type: 'string',
          example: 'lamtung2404@gmail.com',
        },
      },
      {
        name: 'role',
        in: 'query',
        required: true,
        description: 'List staff with role is user',
        schema: {
          type: 'string',
          example: 'user',
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
