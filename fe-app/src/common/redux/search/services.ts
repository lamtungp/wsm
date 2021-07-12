import AxiosMaps from '../../utils/axiosMaps';

const apiKey = 'R023OVDQZL01C8Q7OTdihCWGOsBnV3JyL63lCPtKnQk';
const countryCode = 'countryCode%3AVNM';

const searchService = {
    searchMaps: (param: string): Promise<any> => {
        const result = AxiosMaps.get(`/autocomplete?q=${param}&in=${countryCode}&apiKey=${apiKey}`);
        return result;
    },
};

export default searchService;
