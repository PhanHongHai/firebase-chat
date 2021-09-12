import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";

import { authActions } from "./auth";

interface StatusNotification {
  type: "success" | "warning" | "error" | "info";
  message: string;
  show: boolean;
}
// Define a type for the slice state
interface ConfigState {
  statusNotification: StatusNotification;
}

// Define the initial state using that type
const initialState: ConfigState = {
  statusNotification: {
    show: false,
    type: "info",
    message: "",
  },
};

export const configSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<StatusNotification>) => {
      return produce(state, (draft) => {
        draft.statusNotification = action.payload;
        return draft;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authActions.signinRequest.fulfilled, (state) => {
      return produce(state, (draft) => {
        draft.statusNotification = {
          message: "Signin success ",
          show: true,
          type: "success",
        };
        return draft;
      });
    });
    builder.addCase(
      authActions.signinRequest.rejected,
      (state, action: PayloadAction<any>) => {
        return produce(state, (draft) => {
          draft.statusNotification = {
            message: action.payload || "Something wrong. Please try again!",
            show: true,
            type: "error",
          };
          return draft;
        });
      }
    );
  },
});

export const configActions = configSlice.actions;

export default configSlice.reducer;
