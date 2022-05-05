import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
      counter: (state={value: 0}, action) => {
        console.log(state,action)
        if(action.type === "INCRC0") {
            return {
                ...state,
                value: state.value + 1
            };
        }
        return state;
      },
      counter1: (state={value: 0}, action) => {
        console.log(state,action)
        // if(action.type === "INCRC0") {
        //     return {
        //         ...state,
        //         value: state.value + 1
        //     };
        // }
        return state;
      }
  },
})