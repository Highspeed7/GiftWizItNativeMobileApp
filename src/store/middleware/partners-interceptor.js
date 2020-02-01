import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';
import * as actions from '../actions/index';

const partnersInterceptor = store => next => async action => {
    switch(action.type) {
        case actionTypes.SEARCH_AMAZON:
            try {
                let body = action.data;

                await axios.get(`https://giftwizitapi.azurewebsites.net/api/AWS/ItemSearch/?keywords=${body.keywords}&page=${body.page}`).then((response) => {
                    action.data = response.data.searchResult;
                });
            }
            catch(error) {

            }
    }
    next(action);
}
export default partnersInterceptor;