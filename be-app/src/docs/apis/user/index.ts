import createUser from './createUser.api';
import updateUser from './updateUser.api';
import deleteUser from './deleteUser.api';
import getAll from './getAllUser.api';
import findUser from './findUser.api';
import getListStaff from './getListStaff.api';
import getListUser from './getListUser.api';
import getStaffWithCheckin from './getStaffWithCheckin.api';

export default {
  '/user/create-user': { ...createUser },
  '/user/update-user?email={email}': { ...updateUser },
  '/user/delete-user?email={email}': { ...deleteUser },
  '/user/get-all-user': { ...getAll },
  '/user/find-user-by-email?email={email}': { ...findUser },
  '/user/get-list-staff?email={email}&role={role}': { ...getListStaff },
  '/user/get-list-user/{departmentId}': { ...getListUser },
  '/user/get-staff-with-checkin?email={email}&date={date}': { ...getStaffWithCheckin },
};
