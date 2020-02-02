import * as actionTypes from './actionTypes';

export const searchAmazon = (searchQuery) => {
    return {
        type: actionTypes.SEARCH_AMAZON,
        data: searchQuery
    }
}

export const resetResultPage = () => {
    return {
        type: actionTypes.RESET_RESULT_PAGE
    }
}