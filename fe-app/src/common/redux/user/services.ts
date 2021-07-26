import AxiosClient from '../../utils/axiosClient';
import API from '../../constants/api';

const UserService = {
    getAllUser: (): Promise<any> => {
        const results = AxiosClient.get(API.USER.GET_ALL_USER);
        return results;
    },

    getListUser: (departmentId: number): Promise<any> => {
        const results = AxiosClient.get(`/user/get-list-user/${departmentId}`);
        return results;
    },

    getListStaff: (userId: number): Promise<any> => {
        const results = AxiosClient.get(`/user/get-list-staff/${userId}?role=user`);
        return results;
    },

    getStaffWithCheckin: (userId: number, date: string): Promise<any> => {
        const results = AxiosClient.get(`/user/get-staff-with-checkin/${userId}?date=${date}`);
        return results;
    },

    getUserById: (id: number): Promise<any> => {
        const result = AxiosClient.get(`user/find-user-by-id/${id}`);
        return result;
    },

    addUser: (param: object): Promise<any> => {
        const result = AxiosClient.post('user/create-user', param);
        return result;
    },

    deleteUser: (id: number): Promise<any> => {
        const result = AxiosClient.delete(`user/delete-user/${id}`);
        return result;
    },

    updateUser: (param: object, id: number): Promise<any> => {
        const result = AxiosClient.post(`user/update-user/${id}`, param);
        return result;
    },

    verifyUser: (confirmationCode: string): Promise<any> => {
        const result = AxiosClient.get(`user/confirm/${confirmationCode}`);
        return result;
    },
};

export default UserService;
