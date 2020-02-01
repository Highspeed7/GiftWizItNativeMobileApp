import * as actionTypes from '../actions/actionTypes';

const initialState = {
    currentItems: [],
    pageNum: 0
}

const partnersReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SEARCH_AMAZON: {
            return {
                ...state,
                currentItems: action.data
            }
        }
        default: return state;
    }
}

export default partnersReducer;