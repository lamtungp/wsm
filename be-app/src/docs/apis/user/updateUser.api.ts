export default {
  put: {
    tags: ['user'],
    description: 'Update user',
    operationId: 'update-user',
    parameters: [
      {
        $ref: '#/components/parameters/AuthToken',
      },
      {
        name: 'email',
        in: 'query',
        required: true,
        description: 'The email that needs to be fetched. Use user1 for testing.',
        schema: {
          type: 'string',
          example: 'lamtung2404@gmail.com',
        },
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              name: 'Lam',
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
