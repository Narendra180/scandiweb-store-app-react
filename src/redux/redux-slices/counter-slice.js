import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value: 0
    },
    reducers: {
        incrementBy1: (state) => {
            state.value += 1;
        }
    }
});

export const { incrementBy1 } = counterSlice.actions;

export const selectCounterValue = state => state.counter.value;

export default counterSlice.reducer;