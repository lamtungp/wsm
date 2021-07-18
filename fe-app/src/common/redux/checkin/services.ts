import AxiosClient from '../../utils/axiosClient';

const CheckinServices = {
    getAllCheckin: (): Promise<any> => {
        const results = AxiosClient.get('checkin/get-all-checkin');
        return results;
    },

    getListCheckin: (id: number): Promise<any> => {
        const results = AxiosClient.get(`checkin/get-list-checkin/${id}`);
        return results;
    },

    findCheckinById: (id: number): Promise<any> => {
        const result = AxiosClient.get(`checkin/find-checkin-by-id/${id}`);
        return result;
    },

    addCheckin: (param: object): Promise<any> => {
        const result = AxiosClient.post('checkin/create-checkin', param);
        return result;
    },

    deleteCheckin: (id: number): Promise<any> => {
        const result = AxiosClient.delete(`checkin/delete-checkin/${id}`);
        return result;
    },

    updateCheckin: (param: object): Promise<any> => {
        const dayCheckin = localStorage.getItem('dayCheckin');
        const userId = localStorage.getItem('userId');
        const result = AxiosClient.post(`checkin/update-checkin?userId=${userId}&day=${dayCheckin}`, param);
        return result;
    },

    searchCheckin: (param: any): Promise<any> => {
        const result = AxiosClient.get(`checkin/search-checkin?search=${param}`);
        return result;
    },
};
export default CheckinServices;
