import AxiosClient from '../../utils/axiosClient';

const UserService = {
    getList: (): Promise<any> => {
        const results = AxiosClient.get('/users/get-all-user');
        return results;
    },

    findUserById: (id: number): Promise<any> => {
        const result = AxiosClient.get(`users/find-user-by-id/${id}`);
        return result;
    },

    findUserByEmail: (email: string): Promise<any> => {
        const result = AxiosClient.get(`users/find-user-by-email/${email}`);
        return result;
    },

    addUser: (param: object): Promise<any> => {
        const result = AxiosClient.post('users/create-user', param);
        return result;
    },

    deleteUser: (id: number): Promise<any> => {
        const result = AxiosClient.delete(`users/delete-user/${id}`);
        return result;
    },

    updateUser: (param: object, id: number): Promise<any> => {
        const result = AxiosClient.post(`users/update-user/${id}`, param);
        return result;
    },

    searchUser: (param: any): Promise<any> => {
        const result = AxiosClient.get(`users/search-user?search=${param}`);
        return result;
    },
};
export default UserService;
