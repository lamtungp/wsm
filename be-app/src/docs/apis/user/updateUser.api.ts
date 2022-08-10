const updateUser = {
  updateUserRoleAdmin: {
    put: {
      tags: ['user'],
      description: 'Update user',
      operationId: 'update-user',
      parameters: [
        {
          $ref: '#/components/parameters/AuthToken',
        },
        {
          $ref: '#/components/parameters/Email',
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              example: {
                name: 'Lam',
              },
            },
          },
        },
      },
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
  },
  updateUserRoleUser: {
    put: {
      tags: ['user'],
      description: 'Update user',
      operationId: 'update-user',
      parameters: [
        {
          $ref: '#/components/parameters/AuthToken',
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              example: {
                name: 'Lam',
              },
            },
          },
        },
      },
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
  },
};

export default updateUser;
