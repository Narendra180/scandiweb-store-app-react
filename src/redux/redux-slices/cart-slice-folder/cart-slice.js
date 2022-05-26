import { createSlice } from '@reduxjs/toolkit';
import { isProductWithSameAttributesPresent, getIncreasedTotalPrices, getDecreasedTotalPrices } from './cart-slice-utils';


export const cartSlice = createSlice({
    name: 'counter',
    initialState: {
        products: {},
        totalQuantity: 0,
        totalPrices: []
    },
    reducers: {
        // Here state means we will get only cart object.
        addToCart: (state,action) => {
            if(!(state.products[action.payload.id])) {
                action.payload.index = 0;
                action.payload.quantity = 1;
                state.totalQuantity += 1;
                state.totalPrices = getIncreasedTotalPrices(state.totalPrices,action.payload.prices);
                state.products[action.payload.id] = [action.payload];
            } else {
                const resultObject = isProductWithSameAttributesPresent(state.products[action.payload.id],action.payload);
                if(resultObject.result) {
                    resultObject.foundProductObject.quantity += 1;
                    state.totalQuantity += 1;
                    state.totalPrices = getIncreasedTotalPrices(state.totalPrices,action.payload.prices);
                } else {
                    action.payload.index = state.products[action.payload.id].length;
                    action.payload.quantity = 1;
                    state.totalQuantity += 1;
                    state.totalPrices = getIncreasedTotalPrices(state.totalPrices,action.payload.prices);
                    state.products[action.payload.id].push(action.payload);
                }
            }
        },

        removeItemFromCart: (state,action) => {
            if(state.products[action.payload.id][action.payload.index].quantity > 1) {
                state.products[action.payload.id][action.payload.index].quantity -= 1;
                state.totalQuantity -= 1;
                state.totalPrices = getDecreasedTotalPrices(state.totalPrices,action.payload.prices);
            } else if(state.products[action.payload.id][action.payload.index].quantity === 1) {
                const overlayContentdiv = document.querySelector(".cart-overlay-content");
                overlayContentdiv.focus();
                state.products[action.payload.id] = state.products[action.payload.id].filter((productObject,i) => {
                    if(i > action.payload.index) {
                        productObject.index -= 1;
                    }
                    return action.payload.index !== i;
                });
                state.totalQuantity -= 1;
                state.totalPrices = getDecreasedTotalPrices(state.totalPrices,action.payload.prices);

                if(state.products[action.payload.id].length === 0) {
                    delete state.products[action.payload.id];
                }
            }
        }
    }
});

export const { addToCart,removeItemFromCart } = cartSlice.actions;

// Here state means we will get complete store state object not only cart object.
// export const selectTotalQuantity = (state) => {
//     return state.cart.totalQuantity
// };

export const selectCartCurrentActiveCurrency = (state) => {
    return {
        ...state.cart,
        currentActiveCurrency: state.currency.currentActiveCurrency
    }
};



export default cartSlice.reducer;