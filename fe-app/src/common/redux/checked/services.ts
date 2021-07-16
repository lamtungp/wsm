import AxiosClient from '../../utils/axiosClient';

const CheckedServices = {
    getAllChecked: (): Promise<any> => {
        const results = AxiosClient.get('checkeds/get-all-checked');
        return results;
    },

    getListChecked: (id: number): Promise<any> => {
        const results = AxiosClient.get(`checkeds/get-list-checked/${id}`);
        return results;
    },

    findCheckedById: (id: number): Promise<any> => {
        const result = AxiosClient.get(`checkeds/find-checked-by-id/${id}`);
        return result;
    },

    addChecked: (param: object): Promise<any> => {
        const result = AxiosClient.post('checkeds/create-checked', param);
        return result;
    },

    deleteChecked: (id: number): Promise<any> => {
        const result = AxiosClient.delete(`checkeds/delete-checked/${id}`);
        return result;
    },

    updateChecked: (param: object): Promise<any> => {
        const dayChecked = localStorage.getItem('dayChecked');
        const userID = localStorage.getItem('idAccount');
        const result = AxiosClient.post(`checkeds/update-checked?userID=${userID}&day=${dayChecked}`, param);
        return result;
    },

    searchChecked: (param: any): Promise<any> => {
        const result = AxiosClient.get(`checkeds/search-checked?search=${param}`);
        return result;
    },
};
export default CheckedServices;
