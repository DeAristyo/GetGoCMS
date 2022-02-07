import { combineReducers } from "redux";
import { userAuth } from "./auth";
import {
    userPayment,
    PaymentMethodReducer,
    voucherDetailReducer
} from "./transaction";

const rootReducer = combineReducers({
    userAuth,
    userPayment,
    PaymentMethodReducer,
    voucherDetailReducer
});

export default rootReducer;