export default {
  post: {
    tags: ['user'],
    description: 'This can only be done by the logged in admin.',
    operationId: 'create-user',

    parameters: [
      {
        $ref: '#/components/parameters/AuthToken',
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/user',
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'OK',
      },
      '201': {
        description: 'User created successfully',
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
