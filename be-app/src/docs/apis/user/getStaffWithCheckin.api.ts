export default {
  get: {
    tags: ['user'],
    description: 'Get list staff with checkin',
    operationId: 'get-list-staff-with-checkin',
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
        name: 'date',
        in: 'query',
        required: true,
        description: 'Day checkin',
        schema: {
          type: 'string',
          example: '2021-08-08',
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
