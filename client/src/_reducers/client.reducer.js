import { GET_REQUEST, GET_SUCCESS, GET_FAILURE } from '../_constants/client.constants';
 
export function client(state = { isLoading: true }, action) {
    switch (action.type) {
    case GET_REQUEST:
        return {
        isLoading: true
        };
    case GET_SUCCESS:
        return {
        isLoading: false,
        };
    case GET_FAILURE:
        return {
        isLoading: false,
        error: action.error
        };
    default:
        return state
    }
}