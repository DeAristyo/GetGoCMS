import * as constants from '../types';

export const userPayment = (state = {
    paymentInfo: {},
    error: ''
}, action) => {
    switch (action.type) {
        case constants.USER_PAYMENT_DETAIL:
            return { ...state, paymentInfo: action.payload };
        case constants.USER_PAYMENT_FAIL:
            return { ...state, error: action.payload };
        case constants.USER_PAYMENT_RESET:
            return { ...state, paymentInfo: {}, error: '' };
        default:
            return { ...state };
    }
};

export const PaymentMethodReducer = (state = {
    paymentMethods: {},
    error: ''
}, action) => {
    switch (action.type) {
        case constants.PAYMENT_METHODS:
            return { ...state, paymentMethods: action.payload };
        case constants.PAYMENT_METHODS_FAIL:
            return { ...state, error: action.payload };
        case constants.PAYMENT_METHODS_RESET:
            return { ...state, paymentMethods: {}, error: '' };
        default:
            return { ...state };
    }
};

export const voucherDetailReducer = (state = {
    voucherDetails: {},
    error: ''
}, action) => {
    switch (action.type) {
        case constants.DETAIL_VOUCHER:
            return { ...state, voucherDetails: action.payload };
        case constants.DETAIL_VOUCHER_FAIL:
            return { ...state, error: action.payload };
        case constants.DETAIL_VOUCHER_RESET:
            return { ...state, voucherDetails: {}, error: '' };
        default:
            return { ...state };
    }
};

export const userVoucherReducer = (state = {
    userVouchers: {},
    error: ''
}, action) => {
    switch (action.type) {
        case constants.USER_VOUCHER:
            return { ...state, userVouchers: action.payload };
        case constants.USER_VOUCHER_FAIL:
            return { ...state, error: action.payload };
        case constants.USER_VOUCHER_RESET:
            return { ...state, userVouchers: {}, error: '' };
        default:
            return { ...state };
    }
};