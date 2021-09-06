import AxiosClient from '../../utils/axiosClient';
import API from '../../constants/api';

const userServices = {
  getAllUser: (): Promise<any> => {
    const results = AxiosClient.get(API.USER.GET_ALL_USER);
    return results;
  },

  getListUser: (departmentId: number): Promise<any> => {
    const results = AxiosClient.get(`${API.USER.GET_LIST_USER}/${departmentId}`);
    return results;
  },

  getListStaff: (email: string): Promise<any> => {
    const results = AxiosClient.get(`${API.USER.GET_LIST_STAFF}?email=${email}`);
    return results;
  },

  getStaffWithCheckin: (date: string): Promise<any> => {
    const results = AxiosClient.get(`${API.USER.GET_STAFF_WITH_CHECKIN}?date=${date}`);
    return results;
  },

  getUserByEmail: (email: string): Promise<any> => {
    const result = AxiosClient.get(`${API.USER.GET_USER_BY_EMAIL}?email=${email}`);
    return result;
  },

  addUser: (param: object): Promise<any> => {
    const result = AxiosClient.post(API.USER.ADD_USER, param);
    return result;
  },

  deleteUser: (email: string): Promise<any> => {
    const result = AxiosClient.delete(`${API.USER.DELETE_USER}?email=${email}`);
    return result;
  },

  updateUserRoleAdmin: (param: object, email: string): Promise<any> => {
    const result = AxiosClient.put(`${API.USER.UPDATE_USER_ROLE_ADMIN}?email=${email}`, param);
    return result;
  },

  updateUserRoleUser: (param: object): Promise<any> => {
    const result = AxiosClient.put(API.USER.UPDATE_USER_ROLE_USER, param);
    return result;
  },

  changePassword: (param: object): Promise<any> => {
    const result = AxiosClient.put(API.USER.CHANGE_PASSWORD, param);
    return result;
  },

  verifyUser: (confirmationCode: string): Promise<any> => {
    const result = AxiosClient.put(`${API.USER.VERIFY_USER}/${confirmationCode}`);
    return result;
  },

  resetPassword: (value: object): Promise<any> => {
    const result = AxiosClient.put(API.USER.RESET_PASSWORD, value);
    return result;
  },
};

export default userServices;
