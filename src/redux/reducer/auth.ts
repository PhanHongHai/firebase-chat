import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
// Define a type for the slice state
interface AuthState {
  user: any;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<any>) => {
      return produce(state, (draft) => {
        draft.user = action.payload;
        return draft;
      });
    },
  },
  extraReducers: {},
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
