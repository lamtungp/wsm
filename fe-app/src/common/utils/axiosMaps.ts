import axios from 'axios';

const baseURL = 'https://autocomplete.search.hereapi.com/v1';

const AxiosMaps = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

AxiosMaps.interceptors.request.use(
    async (config) => {
        try {
        } catch (e) {
            console.log('Token Invalid', e);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

AxiosMaps.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        throw Error(error);
    },
);

export default AxiosMaps;
