import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
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
  extraReducers: (builder) => {},
});

export const configActions = configSlice.actions;

export default configSlice.reducer;
