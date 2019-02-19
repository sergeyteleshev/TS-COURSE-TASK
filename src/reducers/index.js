import {combineReducers } from 'redux';
import {
    AV_TIME_CLAIMS_PROCESSING,
    AV_TIME_CLAIMS_RECEIPT,
    DEVICE_AMOUNT,
    MAX_PRIORITY, N,
    STORAGE_CAPACITY
} from "../consts/initialConsts";
import {SETTINGS_HANDLE_CHANGE} from "../actions";



const mainInitialState = {
    MAX_PRIORITY,
    DEVICE_AMOUNT,
    STORAGE_CAPACITY,
    AV_TIME_CLAIMS_RECEIPT,
    AV_TIME_CLAIMS_PROCESSING,
    N,
};

function Main(state = {...mainInitialState}, action) {
   switch(action.type) {
       case SETTINGS_HANDLE_CHANGE:
           return {...state, ...action.payload};

       default:
           return state
    }
}

const storeApp = combineReducers({Main});
export default storeApp;