import { createSlice } from '@reduxjs/toolkit';

export const currencySlice = createSlice(
    {
        name: "currency",
        initialState: {
            currentActiveCurrency: {
                label: "USD",
                symbol: "$"
            }
        },
        reducers: {
            changeCurrentActiveCurrency: (state,action) => {
                state.currentActiveCurrency = action.payload;
            }
        }
    }
);

export const { changeCurrentActiveCurrency } = currencySlice.actions;

export const selectCurrentActiveCurrency = state => state.currency.currentActiveCurrency;

export default currencySlice.reducer;