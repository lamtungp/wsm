export default {
  post: {
    tags: ['request'],
    description: 'This can only be done by the logged in.',
    operationId: 'create-request',

    parameters: [
      {
        $ref: '#/components/parameters/AuthToken',
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/request',
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'OK',
      },
      '201': {
        description: 'Department created successfully',
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
