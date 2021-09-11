import React, { FC } from "react";
import { TextField, Button, Box, Divider, IconButton } from "@material-ui/core";
import { useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Facebook, Phone } from "@material-ui/icons";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import LoginStyles from "./styles";

import { authFirebase, provider } from "utils/firebase";

type FormValues = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().required("Email is required!").email("Email invalid!"),
  password: yup.string().required("Password is required!"),
});

const Login: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const classes = LoginStyles();
  const onSubmit = (data: FormValues) => console.log(data);

  const onLoginByGoogle = () => {
    console.log('vo');
    signInWithPopup(authFirebase, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          console.log('credential',credential);
          console.log('result',result);
          
          // const token = credential.accessToken;
          // // The signed-in user info.
          // const user = result.user;
          // // ...
        }
      })
      .catch((error) => {
        // // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // // ...
      });
  };

  return (
    <div className={classes.root}>
      <Box className={classes.form}>
        <Grid item xs={12}>
          <Box className={classes.logo}>Welcome</Box>
        </Grid>
        <form noValidate>
          <Grid
            container
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <TextField
                error={errors?.email ? true : false}
                helperText={errors?.email?.message || ""}
                fullWidth
                label="Username"
                {...register("email")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={errors?.password ? true : false}
                helperText={errors?.password?.message || ""}
                label="Password"
                {...register("password")}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                spacing={3}
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    variant="contained"
                    color="primary"
                  >
                    Login
                  </Button>
                </Grid>
                <Divider />
                <p>Other login with</p>
                <Grid item xs={12} spacing={2}> 
                  <IconButton onClick={onLoginByGoogle} className={classes.btn} color="default">
                   G
                  </IconButton>
                  <IconButton className={classes.btn} color="default">
                    <Facebook />
                  </IconButton>
                  <IconButton className={classes.btn} color="default">
                    <Phone />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default Login;