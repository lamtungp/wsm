import AxiosClient from '../../utils/axiosClient';

const RequestServices = {
    getAllRequest: (): Promise<any> => {
        const results = AxiosClient.get('requests/get-all-request');
        return results;
    },

    getListRequest: (id: number): Promise<any> => {
        const results = AxiosClient.get(`requests/get-list-request/${id}`);
        return results;
    },

    findRequestById: (id: number): Promise<any> => {
        const result = AxiosClient.get(`requests/find-request-by-id/${id}`);
        return result;
    },

    addRequest: (param: object): Promise<any> => {
        const result = AxiosClient.post('requests/create-request', param);
        return result;
    },

    deleteRequest: (id: number): Promise<any> => {
        const result = AxiosClient.delete(`requests/delete-request/${id}`);
        return result;
    },

    updateRequest: (param: object, id: number): Promise<any> => {
        const result = AxiosClient.post(`requests/update-request/${id}`, param);
        return result;
    },

    searchRequest: (param: any): Promise<any> => {
        const result = AxiosClient.get(`requests/search-request?search=${param}`);
        return result;
    },
};
export default RequestServices;
