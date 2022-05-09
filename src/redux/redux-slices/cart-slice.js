import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'counter',
    initialState: {
        products: [{
            id: "",
            brandName: "",
            productName: "",
            prices: [],
            attributes: [

            ],
            quantity: 1
        }],
        totalQuantity: 1
    },
    reducers: {
        addToCart: (state,action) => {
            state.products.push(action.payload);
        }
    }
});

export const { addToCart } = cartSlice.actions;


export default cartSlice.reducer;