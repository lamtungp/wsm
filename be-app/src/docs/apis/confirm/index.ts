import confirmAccount from './confirmAccount.api';
import confirmPassword from './confirmPassword.api';

export default {
  '/confirm/account/{confirmationCode}': { ...confirmAccount },
  '/confirm/reset-password': { ...confirmPassword },
};
