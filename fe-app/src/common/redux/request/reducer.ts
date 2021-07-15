import { REQUEST_ACTION } from './actionTypes';
// import productService from "./service";

export interface RequestState {
    requests: any[];
}

const initialState: RequestState = {
    requests: [],
};

const reducer = (state = initialState, action: any): RequestState | undefined => {
    switch (action.type) {
        case REQUEST_ACTION.SET_REQUESTS:
            return {
                ...state,
                requests: action.payload,
            };
    }
    return state;
};

export default reducer;
