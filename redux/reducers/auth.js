import * as constants from '../types';

export const userAuth = (state = {
    userInfo: {},
    error: ''
}, action) => {
    switch (action.type) {
        case constants.USER_LOGIN:
            return { ...state, userInfo: action.payload };
        case constants.USER_LOGIN_FAIL:
            return { ...state, error: action.payload };
        case constants.USER_LOGOUT:
            return { ...state, userInfo: {}, error: '' };
        default:
            return { ...state };
    }
};