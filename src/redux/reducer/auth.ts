import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import produce from "immer";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { SignInData } from "types/Auth";
import { authFirebase } from "utils/firebase";

// Define a type for the slice state
interface AuthState {
  user: any;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: {},
};

const signinRequest = createAsyncThunk("auth/SignIn", (data: SignInData) => {
  createUserWithEmailAndPassword(authFirebase, data.email, data.password)
    .then((userCredential: any) => {
      const user = userCredential.user;
      console.log("userCredential", userCredential);
      if (user?.accessToken) localStorage.setItem("token", user.accessToken);
      return {
        email: user.email,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
      };
    })
    .catch((e) => {
      const errorMessage = e.message;
      return errorMessage;
    });
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<any>) => {
      return produce(state, (draft) => {
        draft.user = action.payload;
        return draft;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signinRequest.fulfilled, (state, action) => {
      return produce(state, (draft) => {
        state.user = action.payload;
        return draft;
      });
    });
  },
});

export const authActions = { ...authSlice.actions, signinRequest };

export default authSlice.reducer;
