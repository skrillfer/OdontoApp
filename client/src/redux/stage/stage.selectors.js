import { createSelector } from 'reselect';

const  selectStage = state => state.stage;

export const selectMainStage = createSelector(
    [selectStage],
    stage => stage.mainStage
);

export const selectClockTime = createSelector(
    [selectStage],
    stage => stage.clockTime
);

export const selectCurrentCourse = createSelector(
    [selectStage],
    stage => stage.currentCourse
);

export const selectSpeaker = createSelector(
    [selectStage],
    stage => stage.speaker
);

export const selectProcesingSeat = createSelector(
    [selectStage],
    stage => stage.procesingSeat
);

export const selectOptionSigninSignup = createSelector(
    [selectStage],
    stage => stage.optionSignInSignUp
);