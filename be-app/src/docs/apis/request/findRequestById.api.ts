export default {
  get: {
    tags: ['request'],
    description: 'This can only be done by the logged in.',
    operationId: 'find-request-by-id',

    parameters: [
      {
        $ref: '#/components/parameters/AuthToken',
      },
      {
        name: 'requestId',
        in: 'path',
        required: true,
        description: 'Id of request',
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
