import { StageActionsTypes } from './stage.types';
import event_seats_structure from '../../assets/seat-structure';

import {setStateToSeat} from './stage.utils';

const INITIAL_STATE = {
    mainStage : event_seats_structure,
    currentCourse: 'KIM',
    clockTime : 540,
    speaker : 'KIM',
    procesingSeat : false,
    optionSignInSignUp: true //signin=true, signup=false
}

const stageReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case StageActionsTypes.SET_STATE_SEAT:
            return {
                ...state,
                mainStage : setStateToSeat(state.mainStage,action.payload)
            }
        case StageActionsTypes.SET_CLOCK_TIME:
            return {
                ...state,
                clockTime : action.payload
            }    
        case StageActionsTypes.SET_SPEAKER:
            return {
                ...state,
                speaker : action.payload
            }        
        case StageActionsTypes.SET_COURSE:
            return {
                ...state,
                currentCourse : action.payload
            }
        case StageActionsTypes.SET_PROCESING_SEAT:
            return {
                ...state,
                procesingSeat : !state.procesingSeat
            }    
        case StageActionsTypes.SET_OPTION_SIGNIN_SIGNUP:
            return {
                ...state,
                optionSignInSignUp : action.payload
            }        
        default:
            return state;
    }
}

export default stageReducer;