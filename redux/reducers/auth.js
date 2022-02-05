import * as type from '../actions/actionTypes';

export const userAuth = (state = {
    userInfo: {},
    error: ''
}, action) => {
    switch (action.type) {
        case type.USER_LOGIN:
            return { ...state, userInfo: action.payload };
        case type.USER_LOGIN_FAIL:
            return { ...state, error: action.payload };
        case type.USER_LOGOUT:
            return { ...state, userInfo: {}, error: '' };
        default:
            return { ...state };
    }
};