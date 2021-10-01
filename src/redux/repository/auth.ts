import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  UserCredential,
} from "firebase/auth";

import { AuthData, UserData } from "types";
import { authFirebase, providerGoogle, providerFacebook } from "utils/firebase";

import { configActions } from "../reducer/config";

/**
 * signup request action
 */
const signupRequest = createAsyncThunk("auth/signUp", (data: AuthData, thunkApi) => {
  return createUserWithEmailAndPassword(authFirebase, data.email, data.password)
    .then((userCredential: any) => {
      const user = userCredential.user;
      if (user?.accessToken) localStorage.setItem("token", user.accessToken);
      thunkApi.dispatch(
        configActions.setNotification({
          message: "Signin success ",
          show: true,
          type: "success",
        })
      );
      return {
        email: user.email,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
      };
    })
    .catch((e) => {
      const errorMessage = e.message;
      const errorCode = e.code;
      thunkApi.dispatch(
        configActions.setNotification({
          message: errorMessage || "Something wrong. Please try again!",
          show: true,
          type: "error",
        })
      );
      return thunkApi.rejectWithValue(errorCode);
    });
});

/**
 * signin request action
 */
const signinRequest = createAsyncThunk("auth/singIn", (data: AuthData, thunkApi) => {
  return signInWithEmailAndPassword(authFirebase, data.email, data.password)
    .then((userCredential: any) => {
      const user = userCredential.user;
      if (user?.accessToken) localStorage.setItem("token", user.accessToken);
      thunkApi.dispatch(
        configActions.setNotification({
          message: "Login success ",
          show: true,
          type: "success",
        })
      );
      return {
        email: user.email,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
      };
    })
    .catch((e) => {
      const errorMessage = e.message;
      const errorCode = e.code;
      thunkApi.dispatch(
        configActions.setNotification({
          message: errorMessage || "Something wrong. Please try again!",
          show: true,
          type: "error",
        })
      );
      return thunkApi.rejectWithValue(errorCode);
    });
});
/**
 * sigin with google request action
 */
const signinGoogleRequest = createAsyncThunk("auth/signinGoogle", (data: any = {}, thunkApi) => {
  return signInWithPopup(authFirebase, providerGoogle)
    .then((result: UserCredential): UserData => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const { user } = result;
      if (credential?.accessToken) localStorage.setItem("token", credential.accessToken);
      thunkApi.dispatch(
        configActions.setNotification({
          message: "Signin success ",
          show: true,
          type: "success",
        })
      );
      return {
        email: user.email || "unknown",
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber || "unknown",
        photoURL: user.photoURL || "",
      };
    })
    .catch((e) => {
      const errorCode = e.code;
      const errorMessage = e.message;
      if (errorCode !== "auth/popup-closed-by-user")
        thunkApi.dispatch(
          configActions.setNotification({
            message: errorMessage || "Something wrong. Please try again!",
            show: true,
            type: "error",
          })
        );
      return thunkApi.rejectWithValue(errorCode);
    });
});
/**
 * sigin with facebook request action
 */
const signinFacebookRequest = createAsyncThunk("auth/signinFacebook", (data: any = {}, thunkApi) => {
  return signInWithPopup(authFirebase, providerFacebook)
    .then((result: UserCredential) => {
      const { user } = result;
      const credential = FacebookAuthProvider.credentialFromResult(result);
      if (credential?.accessToken) {
        const accessToken = credential?.accessToken || "";
        localStorage.setItem("token", accessToken);
      }
      thunkApi.dispatch(
        configActions.setNotification({
          message: "Signin success ",
          show: true,
          type: "success",
        })
      );
      return {
        email: user.email || "unknown",
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber || "unknown",
        photoURL: user.photoURL || "",
      };
    })
    .catch((e) => {
      // Handle Errors here.
      const errorCode = e.code;
      const errorMessage = e.message;
      thunkApi.dispatch(
        configActions.setNotification({
          message: errorMessage || "Something wrong. Please try again!",
          show: true,
          type: "error",
        })
      );
      return thunkApi.rejectWithValue(errorCode);
    });
});
/**
 * sigin with phone request action
 */
const signinPhoneRequest = createAsyncThunk("auth/signinPhone", (phoneNumber: string, thunkApi) => {
  const appVerifier = (window as any).recaptchaVerifier;
  return signInWithPhoneNumber(authFirebase, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      console.log("e", confirmationResult);

      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      (window as any).confirmationResult = confirmationResult;
      // ...
    })
    .catch((error) => {
      console.log("error", error);

      // Error; SMS not sent
      // ...
      return thunkApi.rejectWithValue(error);
    });
});

const authRepository = {
  signupRequest,
  signinRequest,
  signinGoogleRequest,
  signinFacebookRequest,
  signinPhoneRequest,
};
export default authRepository;
