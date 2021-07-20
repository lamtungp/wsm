import AxiosClient from '../../utils/axiosClient';

const UserService = {
    getAllUser: (): Promise<any> => {
        const results = AxiosClient.get('/user/get-all-user');
        return results;
    },

    getListUser: (departmentId: number): Promise<any> => {
        const results = AxiosClient.get(`/user/get-list-user/${departmentId}`);
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
};
export default UserService;
