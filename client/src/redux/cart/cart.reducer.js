import { CartActionsTypes } from './cart.types';
import { removeSeatFromCart, addSeatToCart, updatePriceSeat } from './cart.utils';

const INITIAL_STATE = {
    items : []
}

const cartReducer = (state = INITIAL_STATE,action) =>{
    switch(action.type){
        case CartActionsTypes.ADD_SEAT_CART:
            return {
                ...state,
                items : addSeatToCart(state.items,action.payload)
            }
        case CartActionsTypes.REMOVE_SEAT_CART:
            return{
                ...state,
                items: removeSeatFromCart(state.items,action.payload)
            }    
        case CartActionsTypes.CLEAR_SEATS_CART:
            return{
                ...state,
                items: []
            }    
        case CartActionsTypes.UPDATE_PRICE_SEAT:
            return{
                ...state,
                items: updatePriceSeat(state.items,action.payload)//items, seatToUpdate, newPrice
            }    
        default:
            return state;
    }
}

export default cartReducer;