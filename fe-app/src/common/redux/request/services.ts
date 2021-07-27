import AxiosClient from '../../utils/axiosClient';
import API from '../../constants/api';

const requestServices = {
    getAllRequest: (): Promise<any> => {
        const results = AxiosClient.get(API.REQUEST.GET_ALL_REQUEST);
        return results;
    },

    getListRequest: (id: number): Promise<any> => {
        const results = AxiosClient.get(`${API.REQUEST.GET_LIST_REQUEST}/${id}`);
        return results;
    },

    findRequestById: (id: number): Promise<any> => {
        const result = AxiosClient.get(`${API.REQUEST.FIND_REQUEST_BY_ID}/${id}`);
        return result;
    },

    findRequestByState: (state: string): Promise<any> => {
        const result = AxiosClient.get(`${API.REQUEST.FIND_REQUEST_BY_SATE}?state=${state}`);
        return result;
    },

    addRequest: (param: object): Promise<any> => {
        const result = AxiosClient.post(API.REQUEST.ADD_REQUEST, param);
        return result;
    },

    updateRequest: (param: object, id: number): Promise<any> => {
        const result = AxiosClient.post(`${API.REQUEST.UPDATE_REQUEST}/${id}`, param);
        return result;
    },
};
export default requestServices;
