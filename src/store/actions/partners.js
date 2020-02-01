import * as actionTypes from './actionTypes';

export const searchAmazon = (searchQuery) => {
    return {
        type: actionTypes.SEARCH_AMAZON,
        data: searchQuery
    }
}