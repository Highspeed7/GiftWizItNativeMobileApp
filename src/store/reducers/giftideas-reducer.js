import * as actionTypes from '../actions/actionTypes';

const initialState = {
    promoCollections: [],
    collectionItems: [],
    activeCollection: null,
    affiliateNotificationSent: false
}

const giftIdeasReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_ALL_PROMO_COLLECTIONS:
            return {
                ...state,
                promoCollections: action.data
            }
        case actionTypes.SET_IDEA_COLL_ITEMS:
            return {
                ...state,
                collectionItems: action.data
            }
        case actionTypes.SET_IDEA_COLL_ACTIVE:
            return {
                ...state,
                activeCollection: action.data
            }
        case actionTypes.SET_IDEA_COLL_INACTIVE:
            return {
                ...state,
                activeCollection: null
            }
        case actionTypes.SET_AFFLT_NOTIF_STATUS:
            return {
                ...state,
                affiliateNotificationSent: action.value
            }
        default: return state;
    }
}

export default giftIdeasReducer;