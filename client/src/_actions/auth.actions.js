import * as authConstants from '../_constants/auth.constants';
import * as authService from '../services/auth.service';
import { alertActions } from './alert.actions';
import { history } from '../helpers/history';
 
export const authActions = {
    login,
    register,
    logout,
};
 
export function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));
 
        authService.login(username, password)
            .then(
                token => {
                    dispatch(success(token.user.username));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
 
    function request(user) { return { type: authConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: authConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: authConstants.LOGIN_FAILURE, error } }
}

export function register(username, email, password) {
    return dispatch => {
        dispatch(request({ email }));

        authService.register(username, email, password)
            .then(
                token => {
                    dispatch(success(token.user.username));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: authConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: authConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: authConstants.LOGIN_FAILURE, error } }
}
 
export function logout() {
    return dispatch => {
        if(window.confirm("Are you sure?")) { 
            dispatch(request());
    
            authService.logout();
        }
    }
     function request() { return { type: authConstants.LOGOUT } }
    //return { type: authConstants.LOGOUT };
}