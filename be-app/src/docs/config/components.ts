export default {
  schemas: {
    // User model
    user: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
          example: 1,
        },
        name: {
          type: 'string',
          example: 'Pham Tung Lam',
        },
        email: {
          type: 'string',
          example: 'lampt2404@gmail.com',
        },
        password: {
          type: 'string',
          example: '12345678',
        },
        avatar: {
          type: 'string',
          example: 'no-avatar.jpg',
        },
        gender: {
          type: 'string',
          enum: ['male', 'female'],
          example: 'male',
        },
        dob: {
          type: 'string',
          format: 'date',
          example: '2021-07-05',
        },
        phoneNumber: {
          type: 'string',
          example: '123456789',
        },
        senority: {
          type: 'string',
          example: '2 năm',
        },
        address: {
          type: 'string',
          example: 'Ha Noi',
        },
        dayIn: {
          type: 'string',
          format: 'date',
          example: '2021-07-05',
        },
        dayOfficial: {
          type: 'string',
          format: 'date',
          example: '2021-07-05',
        },
        contractTerm: {
          type: 'string',
          example: '2 năm',
        },
        vacationsDay: {
          type: 'integer',
          format: 'int64',
          example: 10,
        },
        status: {
          type: 'string',
          enum: ['pending', 'actived'],
          example: 'actived',
        },
        role: {
          type: 'string',
          enum: ['admin', 'manager', 'user'],
          example: 'admin',
        },
        confirmationCode: {
          type: 'string',
          example: 'abasdfsfa',
        },
        departmentId: {
          type: 'integer',
          format: 'int64',
          example: 1,
        },
      },
    },
    // Department model
    department: {
      type: 'object',
      properties: {
        id: {
          type: 'interger',
          format: 'int64',
          example: '1',
        },
        nameDepartment: {
          type: 'string',
          description: "Department's name",
          example: 'Division 1',
        },
        description: {
          type: 'string',
          example: 'hello',
        },
      },
    },
    // Checkin model
    checkin: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
          example: 1,
        },
        checkin: {
          type: 'string',
          format: 'time',
          example: '9:00',
        },
        checkout: {
          type: 'string',
          format: 'time',
          example: '18:00',
        },
        date: {
          type: 'string',
          format: 'date',
          example: '2021-07-05',
        },
        userId: {
          type: 'integer',
          format: 'int64',
          example: 1,
        },
      },
    },
    // Request model
    request: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
          example: 1,
        },
        nameRequest: {
          type: 'string',
          example: 'Quên checkin/checkout',
        },
        state: {
          type: 'string',
          enum: ['Pending', 'Confirmed', 'Declined'],
          example: 'Pending',
        },

        timeout: {
          type: 'string',
          example: '2021-08-01 9:00:00 ~ 2021-08-01 18:00:00',
        },
        startDay: {
          type: 'string',
          format: 'date-time',
          example: '2021-08-01 9:00:00',
        },
        endDay: {
          type: 'string',
          format: 'date-time',
          example: '2021-08-01 18:00:00',
        },
        phoneNumber: {
          type: 'string',
          example: '123456',
        },
        project: {
          type: 'string',
          example: 'Zinza Intern',
        },
        reason: {
          type: 'string',
          example: 'saaa',
        },
        userId: {
          type: 'integer',
          format: 'int64',
          example: 1,
        },
      },
    },
  },
  parameters: {
    AuthToken: {
      name: 'auth-token',
      in: 'header',
      required: true,
      schema: {
        type: 'string',
        example:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTYsImVtYWlsIjoibGFtcHQyNDA0QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYyODUwMTQwNywiZXhwIjoxNjMwMjI5NDA3fQ.tOTvMLPb8Rrt0SdGtybQlYrg-A6OZik1CD4_DP53HV8',
      },
    },
    Email: {
      name: 'email',
      in: 'query',
      required: true,
      schema: {
        type: 'string',
      },
    },
  },
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
};
