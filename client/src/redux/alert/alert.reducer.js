import { AlertActionsTypes } from './alert.types';
import uuid from "uuid";

const INITIAL_STATE = {
    items : []
};

const alertReducer = (state = INITIAL_STATE,action) =>{
    switch(action.type){
        case AlertActionsTypes.ADD_ALERT:
            return{
                ...state,
                items: [...state.items,{text: action.payload.text, style: action.payload.style,title: action.payload.title, id:uuid()}]
            }
        case AlertActionsTypes.REMOVE_ALERT:
            return{
                ...state,
                items: state.items.filter(_alert=> _alert.id !== action.payload.id)
            } 
        case AlertActionsTypes.REMOVE_ALL:
            return{
                ...state,
                items: []
            }       
        default:
            return state;    
    }
}

export default alertReducer;