import { ERROR_ACTION } from './actionTypes';

export interface ErrorState {
    error: any;
}

const initialState: ErrorState = {
    error: '',
};

const reducer = (state = initialState, action: any): ErrorState => {
    switch (action.type) {
        case ERROR_ACTION.SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
