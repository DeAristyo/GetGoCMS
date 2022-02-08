import * as constants from '../types';
import { API_URL } from '../../constants/urlApi';
import Axios from 'axios';
import { getPaymentMethods, getVoucherDetail, userVoucherDetail } from './transaction';

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

        console.log(payload.data.data);
        localStorage.setItem('accesstoken', JSON.stringify(payload.data.data.accessToken));
        localStorage.setItem('refreshtoken', JSON.stringify(payload.data.data.refreshToken));

        dispatch({
            type: constants.USER_LOGIN,
            payload: payload.data.data
        });
        dispatch({
            type: constants.USER_LOGIN_VOUCHER,
            payload: payload.data.voucher
        });
        dispatch(getPaymentMethods());
        dispatch(getVoucherDetail());
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

export const Relog = (token) => async (dispatch) => {
    try {
        const userdata = localStorage.getItem('accesstoken');
        const userDataParse = JSON.parse(userdata);
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'accesstoken': `${userDataParse.token}`
            }
        };

        const payload = await Axios.post(
            `${API_URL}/auth/relog`, { phone, password }, config
        );

        localStorage.setItem('accessToken', JSON.stringify(payload.data.data.accessToken));

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
    dispatch({ type: constants.PAYMENT_METHODS_RESET });
    dispatch({ type: constants.DETAIL_VOUCHER_RESET });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};