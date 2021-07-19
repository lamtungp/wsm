import AxiosClient from '../../utils/axiosClient';

const DepartmentService = {
    getList: (): Promise<any> => {
        const results = AxiosClient.get('/department/get-all-department');
        return results;
    },

    findDepartmentById: (id: number): Promise<any> => {
        const result = AxiosClient.get(`department/find-department-by-id/${id}`);
        return result;
    },

    addDepartment: (param: object): Promise<any> => {
        const result = AxiosClient.post('department/create-department', param);
        return result;
    },

    deleteDepartment: (id: number): Promise<any> => {
        const result = AxiosClient.delete(`department/delete-department/${id}`);
        return result;
    },

    updateDepartment: (param: object, id: number): Promise<any> => {
        const result = AxiosClient.post(`department/update-department/${id}`, param);
        return result;
    },

    searchDepartment: (param: any): Promise<any> => {
        const result = AxiosClient.get(`department/search-department?search=${param}`);
        return result;
    },
};
export default DepartmentService;
