import AxiosClient from '../../utils/axiosClient';
import API from '../../constants/api';

const requestServices = {
  getAllRequest: (): Promise<any> => {
    const results = AxiosClient.get(API.REQUEST.GET_ALL_REQUEST);
    return results;
  },

  getListRequest: (): Promise<any> => {
    const results = AxiosClient.get(API.REQUEST.GET_LIST_REQUEST);
    return results;
  },

  getListRequestOfStaff: (): Promise<any> => {
    const results = AxiosClient.get(API.REQUEST.GET_LIST_REQUEST_STAFF);
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

  updateFormRequest: (param: object, id: number): Promise<any> => {
    const result = AxiosClient.put(`${API.REQUEST.UPDATE_FORM_REQUEST}/${id}`, param);
    return result;
  },

  updateHandlerRequest: (param: object, id: number): Promise<any> => {
    const result = AxiosClient.put(`${API.REQUEST.UPDATE_HANDLER_REQUEST}/${id}`, param);
    return result;
  },

  deleteRequest: (id: number): Promise<any> => {
    const result = AxiosClient.delete(`${API.REQUEST.DELETE_REQUEST}/${id}`);
    return result;
  },
};
export default requestServices;
