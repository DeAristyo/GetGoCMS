import * as constants from '../types';
import { API_URL } from '../../constants/urlApi';
import Axios from 'axios';

export const getPaymentMethods = () => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const payload = await Axios.get(
            `${API_URL}/cms/paymentMethods`, config
        );

        dispatch({
            type: constants.PAYMENT_METHODS,
            payload: payload.data.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: constants.PAYMENT_METHODS_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message
                :
                err.message,
        });
    }
};

export const getVoucherDetail = () => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const payload = await Axios.get(
            `${API_URL}/cms/voucherDetail`, config
        );

        dispatch({
            type: constants.DETAIL_VOUCHER,
            payload: payload.data.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: constants.DETAIL_VOUCHER_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message
                :
                err.message,
        });
    }
};

export const userVoucherDetail = (phone) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const payload = await Axios.post(
            `${API_URL}/cms/getAllUserVoucher`, { phone }, config
        );

        dispatch({
            type: constants.USER_VOUCHER,
            payload: payload.data.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: constants.USER_VOUCHER_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message
                :
                err.message,
        });
    }
};

