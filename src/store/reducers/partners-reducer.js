import * as actionTypes from '../actions/actionTypes';

const initialState = {
    currentItems: [],
    raw: {},
    pageNum: 1
}

const partnersReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SEARCH_AMAZON: {
            return {
                ...state,
                currentItems: state.currentItems.concat(action.data.searchResult.items),
                raw: action.data.searchResult,
                pageNum: action.data.page
            }
        }
        case actionTypes.RESET_RESULT_PAGE: {
            return {
                ...state,
                currentItems: [],
                raw: {},
                pageNum: 1
            }
        }
        default: return state;
    }
}

export default partnersReducer;