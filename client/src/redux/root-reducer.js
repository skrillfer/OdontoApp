import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import stageReducer from './stage/stage.reducer';
import cartReducer from './cart/cart.reducer';
import alertReducer from './alert/alert.reducer';
export default combineReducers({
    user  : userReducer,
    stage : stageReducer,
    cart  : cartReducer,
    alerts: alertReducer
});