import AxiosClient from '../../utils/axiosClient';
import API from '../../constants/api';

import { LoginParams } from './actionTypes';

const authServices = {
    login: (data: LoginParams): Promise<any> => {
        const results = AxiosClient.post(API.AUTH.LOGIN, data);
        return results;
    },
};
export default authServices;
