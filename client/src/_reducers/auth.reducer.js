import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../_constants/auth.constants';
 
let token = JSON.parse(localStorage.getItem('accessToken'));
const initialState = token ? { loggedIn: true, user: token.user.username } 
                           : { loggedIn: false, user: null };
 
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