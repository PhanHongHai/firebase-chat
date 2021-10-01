import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";

import { AuthRepository } from "../repository";
import { UserData } from "types";
// Define a type for the slice state

interface AuthState {
  user: UserData | {};
}

// Define the initial state using that type
const initialState: AuthState = {
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setcredentialData: (state, action: PayloadAction<UserData>) => {
      return produce(state, (draft) => {
        draft.user = action.payload;
        return draft;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      AuthRepository.signupRequest.fulfilled,
      (state, action: PayloadAction<UserData>) => {
        return produce(state, (draft) => {
          draft.user = action.payload || {};
          return draft;
        });
      }
    );
    builder.addCase(
      AuthRepository.signinRequest.fulfilled,
      (state, action: PayloadAction<UserData>) => {
        return produce(state, (draft) => {
          draft.user = action.payload || {};
          return draft;
        });
      }
    );
    builder.addCase(
      AuthRepository.signinGoogleRequest.fulfilled,
      (state, action: PayloadAction<UserData>) => {
        return produce(state, (draft) => {
          draft.user = action.payload || {};
          return draft;
        });
      }
    );
    builder.addCase(
      AuthRepository.signinFacebookRequest.fulfilled,
      (state, action: PayloadAction<UserData>) => {
        return produce(state, (draft) => {
          draft.user = action.payload || {};
          return draft;
        });
      }
    );
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
