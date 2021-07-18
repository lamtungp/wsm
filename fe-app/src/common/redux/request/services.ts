import AxiosClient from '../../utils/axiosClient';

const RequestServices = {
    getAllRequest: (): Promise<any> => {
        const results = AxiosClient.get('request/get-all-request');
        return results;
    },

    getListRequest: (id: number): Promise<any> => {
        const results = AxiosClient.get(`request/get-list-request/${id}`);
        return results;
    },

    findRequestById: (id: number): Promise<any> => {
        const result = AxiosClient.get(`request/find-request-by-id/${id}`);
        return result;
    },

    addRequest: (param: object): Promise<any> => {
        const result = AxiosClient.post('request/create-request', param);
        return result;
    },

    deleteRequest: (id: number): Promise<any> => {
        const result = AxiosClient.delete(`request/delete-request/${id}`);
        return result;
    },

    updateRequest: (param: object, id: number): Promise<any> => {
        const result = AxiosClient.post(`request/update-request/${id}`, param);
        return result;
    },

    searchRequest: (param: any): Promise<any> => {
        const result = AxiosClient.get(`request/search-request?search=${param}`);
        return result;
    },
};
export default RequestServices;
