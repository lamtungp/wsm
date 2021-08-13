import createDepartment from './createDepartment.api';
import updateDepartment from './updateDepartment.api';
import deleteDepartment from './deleteDepartment.api';
import getAllDepartment from './getAllDepartment.api';
import findDepartment from './findDepartment.api';

export default {
  '/department/create-department': { ...createDepartment },
  '/department/update-department/{departmentId}': { ...updateDepartment },
  '/department/delete-department/{departmentId}': { ...deleteDepartment },
  '/department/get-all-department': { ...getAllDepartment },
  '/department/find-department-by-id/{departmentId}': { ...findDepartment },
};
