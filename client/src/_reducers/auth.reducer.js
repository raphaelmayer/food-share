import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../_constants/auth.constants';
import { getToken } from '../helpers/token';

const tokens = getToken();
const initialState = tokens.user ? 
    { loggedIn: true, user: tokens.user.username } : { loggedIn: false, user: null };
 
export function auth(state = initialState, action) {
    switch (action.type) {
    case LOGIN_REQUEST:
        return {
        loggingIn: true,
        user: action.user.username
        };
    case LOGIN_SUCCESS:
        return {
        loggedIn: true,
        user: action.user
        };
    case LOGIN_FAILURE:
        return {};
    case LOGOUT:
        return {
            loggedIn: false,
            user: null
        };
    default:
        return state
    }
}