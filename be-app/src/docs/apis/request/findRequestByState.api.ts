export default {
  get: {
    tags: ['request'],
    description: 'This can only be done by the logged in.',
    operationId: 'find-request-by-state',

    parameters: [
      {
        $ref: '#/components/parameters/AuthToken',
      },
      {
        name: 'state',
        in: 'query',
        required: true,
        description: 'State of request',
        schema: {
          type: 'string',
          enum: ['Pending', 'Confirmed', 'Declined'],
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
