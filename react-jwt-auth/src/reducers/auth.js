import {
    SET_AUTH_TOKEN,
    CLEAR_AUTH,
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_ERROR,
    LOGOUT_WARNING,
    RESTART_AUTO_LOGOUT,

    clearAuth,
    logoutWarning,
} from '../actions/auth';

const DIALOG_TIME = 0.25 * 60 * 1000;
const LOGOUT_TIME = 0.45 * 60 * 1000;

const initialState = {
    authToken: null, // authToken !== null does not mean it has been validated
    currentUser: null,
    loading: false,
    error: null,
    showLogoutWarning: false,
    logoutTimer: null,
    dialogTimer: null,
};

export default function reducer(state = initialState, action) {
    if (action.type === SET_AUTH_TOKEN) {
        return Object.assign({}, state, {
            authToken: action.authToken
        });
    } else if (action.type === CLEAR_AUTH) {
        clearTimeout(state.logoutTimer);
        clearTimeout(state.dialogTimer);
        return Object.assign({}, state, {
            authToken: null,
            currentUser: null,
            showLogoutWarning: false,
        });
    } else if (action.type === AUTH_REQUEST) {
        return Object.assign({}, state, {
            loading: true,
            error: null
        });
    } else if (action.type === AUTH_SUCCESS) {
        return Object.assign({}, state, {
            loading: false,
            currentUser: action.currentUser
        });
    } else if (action.type === AUTH_ERROR) {
        return Object.assign({}, state, {
            loading: false,
            error: action.error
        });
    } else if (action.type === LOGOUT_WARNING) {
        return {
            ...state,
            showLogoutWarning: action.showWarning,
        };
    } else if (action.type === RESTART_AUTO_LOGOUT) {
        clearTimeout(state.logoutTimer);
        clearTimeout(state.dialogTimer);
        return {
            ...state,
            showLogoutWarning: false,
            logoutTimer: action.logoutTimer,
            dialogTimer: action.dialogTimer,
        };
    }
    return state;
}
