import userLogin from './userLogin.api';

export default {
  '/auth/user-login': { ...userLogin },
};
