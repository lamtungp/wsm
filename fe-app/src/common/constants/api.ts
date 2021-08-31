const API = {
  AUTH: {
    LOGIN: 'auth/user-login',
  },

  USER: {
    GET_ALL_USER: 'user/get-all-user',
    GET_LIST_USER: 'user/get-list-user',
    GET_LIST_STAFF: 'user/get-list-staff',
    GET_STAFF_WITH_CHECKIN: 'user/get-staff-with-checkin',
    GET_USER_BY_EMAIL: 'user/find-user-by-email',
    ADD_USER: 'user/create-user',
    UPDATE_USER_ROLE_ADMIN: 'user/update-user-role-admin',
    UPDATE_USER_ROLE_USER: 'user/update-user-role-user',
    DELETE_USER: 'user/delete-user',
    VERIFY_USER: 'confirm/account',
    RESET_PASSWORD: 'confirm/reset-password',
  },

  CHECKIN: {
    GET_LIST_CHECKIN: 'checkin/get-list-checkin',
    GET_LIST_CHECKIN_WITH_DATE: 'checkin/get-list-checkin-with-date',
    GET_CHECKIN_BY_USER_ID: 'checkin/find-checkin',
    CREATE_CHECKIN: 'checkin/create-checkin',
  },

  REQUEST: {
    GET_ALL_REQUEST: 'request/get-all-request',
    GET_LIST_REQUEST: 'request/get-list-request',
    GET_LIST_REQUEST_STAFF: 'request/get-list-request-of-staff',
    FIND_REQUEST_BY_ID: 'request/find-request-by-id',
    FIND_REQUEST_BY_SATE: 'request/find-request-by-state',
    ADD_REQUEST: 'request/create-request',
    UPDATE_FORM_REQUEST: 'request/update-form-request',
    UPDATE_HANDLER_REQUEST: 'request/update-handler-request',

    DELETE_REQUEST: 'request/delete-request',
  },

  DEPARTMENT: {
    GET_ALL_DEPARTMENT: 'department/get-all-department',
    FIND_DEPARTMENT_BY_ID: 'department/find-department-by-id',
    ADD_DEPARTMENT: 'department/create-department',
    DELETE_DEPARTMENT: 'department/delete-department',
    UPDATE_DEPARTMENT: 'department/update-department',
  },
};

export default API;
