import { createSlice } from '@reduxjs/toolkit';
import { isProductWithSameAttributesPresent } from './cart-slice-utils';
import { current } from '@reduxjs/toolkit';


export const cartSlice = createSlice({
    name: 'counter',
    initialState: {
        products: {},
        totalQuantity: 0
    },
    reducers: {
        // Here state means we will get only cart object.
        addToCart: (state,action) => {
            if(!(state.products[action.payload.id])) {
                action.payload.index = 0;
                action.payload.quantity = 1;
                state.totalQuantity += 1;
                state.products[action.payload.id] = [action.payload];
            } else {
                const resultObject = isProductWithSameAttributesPresent(state.products[action.payload.id],action.payload);
                if(resultObject.result) {
                    resultObject.foundProductObject.quantity += 1;
                    state.totalQuantity += 1;
                } else {
                    action.payload.index = state.products[action.payload.id].length;
                    action.payload.quantity = 1;
                    state.totalQuantity += 1;
                    state.products[action.payload.id].push(action.payload);
                }
            }
        }
    }
});

export const { addToCart } = cartSlice.actions;

// Here state means we will get complete store state object not only cart object.
// export const selectTotalQuantity = (state) => {
//     return state.cart.totalQuantity
// };

export const selectToatalQuantityCurrentActiveCurrency = (state) => {
    return {
        totalQuantity: state.cart.totalQuantity,
        currentActiveCurrency: state.currency.currentActiveCurrency
    }
};

export default cartSlice.reducer;