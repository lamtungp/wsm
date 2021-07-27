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

    getListStaff: (userId: number): Promise<any> => {
        const results = AxiosClient.get(`${API.USER.GET_LIST_STAFF}/${userId}?role=user`);
        return results;
    },

    getStaffWithCheckin: (userId: number, date: string): Promise<any> => {
        const results = AxiosClient.get(`${API.USER.GET_STAFF_WITH_CHECKIN}/${userId}?date=${date}`);
        return results;
    },

    getUserById: (id: number): Promise<any> => {
        const result = AxiosClient.get(`${API.USER.GET_USER_BY_ID}/${id}`);
        return result;
    },

    addUser: (param: object): Promise<any> => {
        const result = AxiosClient.post(API.USER.ADD_USER, param);
        return result;
    },

    deleteUser: (id: number): Promise<any> => {
        const result = AxiosClient.delete(`${API.USER.DELETE_USER}/${id}`);
        return result;
    },

    updateUser: (param: object, id: number): Promise<any> => {
        const result = AxiosClient.post(`${API.USER.UPDATE_USER}/${id}`, param);
        return result;
    },

    verifyUser: (confirmationCode: string): Promise<any> => {
        const result = AxiosClient.get(`${API.USER.VERIFY_USER}/${confirmationCode}`);
        return result;
    },
};

export default userServices;
