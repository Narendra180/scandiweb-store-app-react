import { createSlice } from '@reduxjs/toolkit';
import { isProductWithSameAttributesPresent, getIncreasedTotalPrices } from './cart-slice-utils';
import { current } from '@reduxjs/toolkit';


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
                // console.log(state.totalPrices);
            } else {
                const resultObject = isProductWithSameAttributesPresent(state.products[action.payload.id],action.payload);
                if(resultObject.result) {
                    resultObject.foundProductObject.quantity += 1;
                    state.totalQuantity += 1;
                    state.totalPrices = getIncreasedTotalPrices(state.totalPrices,action.payload.prices);
                    // console.log(state.totalPrices);
                } else {
                    action.payload.index = state.products[action.payload.id].length;
                    action.payload.quantity = 1;
                    state.totalQuantity += 1;
                    state.totalPrices = getIncreasedTotalPrices(state.totalPrices,action.payload.prices);
                    state.products[action.payload.id].push(action.payload);
                    // console.log(state.totalPrices);
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

export const selectCartCurrentActiveCurrency = (state) => {
    return {
        ...state.cart,
        currentActiveCurrency: state.currency.currentActiveCurrency
    }
};



export default cartSlice.reducer;