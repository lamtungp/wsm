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
        const results = AxiosClient.get(`${API.USER.GET_LIST_STAFF}?email=${email}&role=user`);
        return results;
    },

    getStaffWithCheckin: (email: string, date: string): Promise<any> => {
        const results = AxiosClient.get(`${API.USER.GET_STAFF_WITH_CHECKIN}?email=${email}&date=${date}`);
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

    updateUser: (param: object, email: string): Promise<any> => {
        const result = AxiosClient.post(`${API.USER.UPDATE_USER}?email=${email}`, param);
        return result;
    },

    verifyUser: (confirmationCode: string): Promise<any> => {
        const result = AxiosClient.get(`${API.USER.VERIFY_USER}/${confirmationCode}`);
        return result;
    },
};

export default userServices;
