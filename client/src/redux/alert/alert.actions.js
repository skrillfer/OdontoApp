import {  AlertActionsTypes } from './alert.types';

export const addAlert = _alert =>({
    type: AlertActionsTypes.ADD_ALERT,
    payload : _alert
});

export const removeAlert = _alert =>({
    type: AlertActionsTypes.REMOVE_ALERT,
    payload : _alert
});

export const removeAllAlerts = () =>({
    type: AlertActionsTypes.REMOVE_ALL
});
