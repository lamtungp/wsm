export default {
  get: {
    tags: ['request'],
    description: 'This can only be done by the logged in.',
    operationId: 'get-all-request',

    parameters: [
      {
        $ref: '#/components/parameters/AuthToken',
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
