import { combineReducers } from "redux";
import { userAuth } from "./auth";
import {
    userPayment,
    PaymentMethodReducer,
    voucherDetailReducer,
    userVoucherReducer
} from "./transaction";

const rootReducer = combineReducers({
    userAuth,
    userPayment,
    PaymentMethodReducer,
    voucherDetailReducer,
    userVoucherReducer
});

export default rootReducer;