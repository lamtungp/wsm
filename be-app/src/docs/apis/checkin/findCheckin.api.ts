export default {
  get: {
    tags: ['checkin'],
    description: 'Find checkin of user',
    operationId: 'find-checkin',

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
      {
        name: 'date',
        in: 'query',
        required: true,
        description: 'date checkin',
        schema: {
          type: 'string',
          format: 'date',
          example: '2021-08-14',
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
