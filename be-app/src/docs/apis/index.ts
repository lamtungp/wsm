import authApis from './auth/index';
import userApis from './user/index';
import departmentApis from './department/index';
import requestApis from './request/index';
import checkinApis from './checkin/index';
import confirmApis from './confirm/index';

export default {
  ...authApis,
  ...userApis,
  ...departmentApis,
  ...requestApis,
  ...checkinApis,
  ...confirmApis,
};
