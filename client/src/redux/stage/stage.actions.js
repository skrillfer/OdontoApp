import {StageActionsTypes} from './stage.types';
export const setStateSeat = seat =>({
    type: StageActionsTypes.SET_STATE_SEAT,
    payload: seat
});

export const setClockTime = time =>({
    type: StageActionsTypes.SET_CLOCK_TIME,
    payload: time
});

export const setSpeaker = time =>({
    type: StageActionsTypes.SET_SPEAKER,
    payload: time
});

export const setCourse = time =>({
    type: StageActionsTypes.SET_COURSE,
    payload: time
});

export const setProcesingSeat = () =>({
    type: StageActionsTypes.SET_PROCESING_SEAT
});

export const setOptionSigninSignup = option =>({
    type: StageActionsTypes.SET_OPTION_SIGNIN_SIGNUP,
    payload: option
});