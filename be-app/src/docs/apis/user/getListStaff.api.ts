export default {
  get: {
    tags: ['user'],
    description: 'Get list staff with role is user',
    operationId: 'get-list-staff',
    parameters: [
      {
        $ref: '#/components/parameters/AuthToken',
      },
      {
        $ref: '#/components/parameters/Email',
      },
      {
        name: 'role',
        in: 'query',
        required: true,
        description: 'List staff with role is user',
        schema: {
          type: 'string',
          enum: ['user', 'admin', 'manager'],
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
