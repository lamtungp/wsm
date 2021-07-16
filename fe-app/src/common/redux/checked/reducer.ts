import { CHECKED_ACTION } from './actionTypes';
// import productService from "./service";

export interface CheckedState {
    Checkeds: any[];
}

const initialState: CheckedState = {
    Checkeds: [],
};

const reducer = (state = initialState, action: any): CheckedState | undefined => {
    switch (action.type) {
        case CHECKED_ACTION.SET_CHECKEDS:
            return {
                ...state,
                Checkeds: action.payload,
            };
    }
    return state;
};

export default reducer;
