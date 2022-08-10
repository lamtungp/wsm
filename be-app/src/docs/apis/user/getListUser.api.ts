export default {
  get: {
    tags: ['user'],
    description: 'Get list user of department',
    operationId: 'get-list-user',
    parameters: [
      {
        $ref: '#/components/parameters/AuthToken',
      },
      {
        name: 'departmentId',
        in: 'path',
        required: true,
        description: 'Id of department',
        schema: {
          type: 'integer',
          format: 'int64',
          example: 1,
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
