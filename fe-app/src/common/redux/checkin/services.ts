import AxiosClient from '../../utils/axiosClient';
import API from '../../constants/api';

const checkinServices = {
  getListCheckin: (id: number): Promise<any> => {
    const results = AxiosClient.get(`${API.CHECKIN.GET_LIST_CHECKIN}/${id}`);
    return results;
  },

  getListCheckinWithDate: (userId: number, date: string): Promise<any> => {
    const results = AxiosClient.get(`${API.CHECKIN.GET_LIST_CHECKIN_WITH_DATE}/${userId}?date=${date}`);
    return results;
  },

  getCheckinByUserId: (userId: number, date: string): Promise<any> => {
    const results = AxiosClient.get(`${API.CHECKIN.GET_CHECKIN_BY_USER_ID}/${userId}?date=${date}`);
    return results;
  },

  createCheckin: (): Promise<any> => {
    const result = AxiosClient.post(API.CHECKIN.CREATE_CHECKIN);
    return result;
  },
};
export default checkinServices;
