import * as clientConstants from '../_constants/client.constants';
import * as clientService from '../services/client.service';

export const clientActions = {
    getRequest,
    getSuccess,
    getFailure
};

export function getRequest() {
    return dispatch => {
        dispatch({ type: clientConstants.GET_REQUEST });
    }; 
}

export function getSuccess() {
    return dispatch => {
        dispatch({ type: clientConstants.GET_SUCCESS });
    };
}

export function getFailure(error) {
    return dispatch => {
        dispatch({ type: clientConstants.GET_FAILURE, error });
    };
}