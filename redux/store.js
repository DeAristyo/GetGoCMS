import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const middleWare = [thunk];

const makeStore = () => createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleWare)));

export const wrapper = createWrapper(makeStore);