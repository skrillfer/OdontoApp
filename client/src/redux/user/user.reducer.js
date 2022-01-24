import { UserActionsTypes } from './user.types';

const INITIAL_STATE = {
    currentUser : null,
    conexionSocket:null,
}

const userReducer = (state = INITIAL_STATE,action) =>{
    switch(action.type){
        case UserActionsTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser : action.payload
            }
        case UserActionsTypes.SET_SOCKET_CONECTION:
            return {
                ...state,
                conexionSocket : action.payload
            }    
        default:
            return state;
    }
}

export default userReducer;