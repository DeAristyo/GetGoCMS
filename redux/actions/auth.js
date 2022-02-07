import * as constants from '../types';
import { API_URL } from '../../constants/urlApi';
import Axios from 'axios';

export const Login = (phone, password) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const payload = await Axios.post(
            `${API_URL}/auth/login`, { phone, password }, config
        );

        localStorage.setItem('accessToken', JSON.stringify(payload.data.data.accessToken));
        localStorage.setItem('refreshToken', JSON.stringify(payload.data.data.refreshToken));

        dispatch({
            type: constants.USER_LOGIN,
            payload: payload.data.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: constants.USER_LOGIN_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message
                :
                err.message,
        });
    }
};

export const Logout = () => async (dispatch) => {
    dispatch({ type: constants.USER_LOGOUT });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};