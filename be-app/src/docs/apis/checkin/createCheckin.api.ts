export default {
  post: {
    tags: ['checkin'],
    description: 'Create or update checkin',
    operationId: 'update-checkin',

    parameters: [
      {
        $ref: '#/components/parameters/AuthToken',
      },
    ],

    responses: {
      '200': {
        description: 'OK',
      },
      '500': {
        description: 'Internal Server Error',
      },
    },
  },
};
