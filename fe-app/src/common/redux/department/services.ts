import AxiosClient from '../../utils/axiosClient';
import API from '../../constants/api';

const departmentServices = {
    getAllDepartment: (): Promise<any> => {
        const results = AxiosClient.get(API.DEPARTMENT.GET_ALL_DEPARTMENT);
        return results;
    },

    findDepartmentById: (id: number): Promise<any> => {
        const result = AxiosClient.get(`${API.DEPARTMENT.FIND_DEPARTMENT_BY_ID}/${id}`);
        return result;
    },

    addDepartment: (param: object): Promise<any> => {
        const result = AxiosClient.post(API.DEPARTMENT.ADD_DEPARTMENT, param);
        return result;
    },

    deleteDepartment: (id: number): Promise<any> => {
        const result = AxiosClient.delete(`${API.DEPARTMENT.DELETE_DEPARTMENT}/${id}`);
        return result;
    },

    updateDepartment: (param: object, id: number): Promise<any> => {
        const result = AxiosClient.post(`${API.DEPARTMENT.UPDATE_DEPARTMENT}/${id}`, param);
        return result;
    },
};
export default departmentServices;
