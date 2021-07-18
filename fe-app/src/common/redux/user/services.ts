import AxiosClient from '../../utils/axiosClient';

const UserService = {
    getList: (): Promise<any> => {
        const results = AxiosClient.get('/user/get-all-user');
        return results;
    },

    findUserById: (id: number): Promise<any> => {
        const result = AxiosClient.get(`user/find-user-by-id/${id}`);
        return result;
    },

    findUserByEmail: (email: string): Promise<any> => {
        const result = AxiosClient.get(`user/find-user-by-email/${email}`);
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

    searchUser: (param: any): Promise<any> => {
        const result = AxiosClient.get(`user/search-user?search=${param}`);
        return result;
    },
};
export default UserService;
