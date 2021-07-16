import { CHECKED_ACTION } from './actionTypes';
// import productService from "./service";

export interface CheckedState {
    checkeds: any[];
}

const initialState: CheckedState = {
    checkeds: [],
};

const reducer = (state = initialState, action: any): CheckedState | undefined => {
    switch (action.type) {
        case CHECKED_ACTION.SET_CHECKEDS:
            return {
                ...state,
                checkeds: [...state.checkeds, action.payload],
            };
    }
    return state;
};

export default reducer;
