export default {
  generalMessage: {
    Error: 'There was some error',
    ApiNotExist: 'Method does not exist',
    success: 'Success',
  },

  httpMessages: {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not found',
    409: 'Conflict',
    422: 'Unprocessable Entity',
    500: 'Internal Server Error',
    544: 'Unknown HTTP Error',
  },

  auth: {
    failed: 'Either email or password is incorrect. Please try again',
    userExists: 'Email Address already in use',
    inactive: 'The account has not been verified',
    userNotExists: 'The email address you entered does not exist',
    invalidCode: 'Incorrect verification code',
    invalidAction: 'Not Supported',
    invalidToken: 'Token Invalid',
    tokenNotExists: 'Access Denied',
    invalidRole: 'Not permission',
    authFailure: 'Authenticate Error',
    invalidBearerToken: 'BearerToken Invalid',
  },

  user: {
    getUsersFailure: 'Get users failure',
    managerAccountNotExists: 'Manager account does not exist',
    createUserFailure: 'Create user failure',
    updatePasswordFailure: 'Update password failure',
    activeAccountFailure: 'Active account failure',
    updateUserFailure: 'Update user failure',
    deleteUserFailure: 'Delete user failure',
    activeAcountSuccess: 'Account was actived',
    updateUserSuccess: 'Update user successfully',
    deleteUserSuccess: 'Delete user successfully',
  },

  mail: {
    sendError: 'An error occurred while sending mail',
    createAccountSuccess: 'User was registered successfully! Please check your email',
    resetPasswordSuccess: 'Reset password successfully! Please check your email',
  },

  checkin: {
    notFound: 'Not found checkin',
    availabled: 'Availabled checkin',
    notCheckin: 'Not checkin',
    createFailure: 'Create checkin failure',
    updateSuccess: 'Update checkin successfully',
  },

  department: {
    getFaliure: 'Get all department failure',
    departmentNotExists: 'Department does not exist',
    departmentExists: 'Department existed',
    addFailure: 'Add department failure',
    updateFailure: 'Update department failure',
    notAllowDelete: 'Deparment has member, not allow to delete!!',
    deleteFailure: 'Delete department failure',
    updateSuccess: 'Update department successfully',
    deleteSuccess: 'Delete department successfully',
  },

  request: {
    getRequestFailure: 'Get request failure',
    addRequestFailure: 'Add request failure',
    updateRequestFailure: 'Update request failure',
    deleteRequestFailure: 'Delete request failure',
    requestNotExists: 'Request does not exist',
    updateRequestSuccess: 'Update request successfully',
    deleteRequestSuccess: 'Delete request successfully',
  },
};
