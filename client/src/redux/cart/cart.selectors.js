import { createSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems =  createSelector(
    [selectCart],
    cart => cart.items
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    items => items.length
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    items => items.reduce( (total,{price}) => total + price ,0)
);

