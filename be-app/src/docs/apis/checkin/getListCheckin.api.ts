export default {
  get: {
    tags: ['checkin'],
    description: 'Get list checkin',
    operationId: 'get-list-checkin',

    parameters: [
      {
        $ref: '#/components/parameters/AuthToken',
      },
      {
        name: 'userId',
        in: 'path',
        required: true,
        description: 'Id of user',
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
      '500': {
        description: 'Internal Server Error',
      },
    },
  },
};
