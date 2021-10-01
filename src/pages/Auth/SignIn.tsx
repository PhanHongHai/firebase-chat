import React, { FC, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import * as yup from "yup";
import { Facebook, Phone } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { RecaptchaVerifier } from "firebase/auth";

import { useAppDispatch } from "redux/store";

import LoginStyles from "./styles";

import { AuthRepository } from "redux/repository";

import { authFirebase } from "utils/firebase";

import useYupValidationResolver from "utils/helper/validateYup";

type FormValues = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().required("Email is required!").email("Email invalid!"),
  password: yup.string().required("Password is required!"),
});

const Login: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const resolver = useYupValidationResolver(schema);

  // const handleSetupCapcha = () => {
  //   try {
  //     (window as any).recaptchaVerifier = new RecaptchaVerifier(
  //       "sign-in-button",
  //       {
  //         size: "invisible",
  //         callback: (res: any) => {
  //           console.log("res", res);
  //         },
  //       },
  //       authFirebase
  //     );
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     handleSetupCapcha();
  //   }, 500);
  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver,
  });
  const classes = LoginStyles();
  /**
   * handle login
   * @param data
   */
  const onSubmit = (data: FormValues) => {
    setLoading(true);
    dispatch(AuthRepository.signinRequest(data))
      .then(() => {
        history.push("/");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  /**
   *
   */
  const onLoginByGoogle = () => {
    setLoading(true);
    dispatch(AuthRepository.signinGoogleRequest({}))
      .then(() => {
        history.push("/");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onLoginByFacebook = () => {
    setLoading(true);
    dispatch(AuthRepository.signinFacebookRequest({}))
      .then(() => {
        history.push("/");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onLoginByPhone = () => {
    setLoading(true);
    try {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "normal",
          callback: (res: any) => {
            console.log("res", res);
            dispatch(AuthRepository.signinPhoneRequest("234234434"))
              .then(() => {
                history.push("/");
              })
              .finally(() => {
                setLoading(false);
              });
          },
        },
        authFirebase
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={classes.root}>
      <Box className={classes.form}>
        <Grid item xs={12}>
          <Box className={classes.logo}>Welcome</Box>
        </Grid>
        <form noValidate>
          <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
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
              <Grid container spacing={3} direction="column" justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                  <Button onClick={handleSubmit(onSubmit)} variant="contained" color="primary" disabled={loading}>
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      history.push("/signup");
                    }}
                    variant="contained"
                    color="secondary"
                  >
                    SignUp
                  </Button>
                </Grid>
                <Divider />
                <div id="recaptcha-container" />

                <p>Other login with</p>
                <Grid item xs={12}>
                  <IconButton onClick={onLoginByGoogle} className={classes.btn} color="default" disabled={loading}>
                    G
                  </IconButton>
                  <IconButton onClick={onLoginByFacebook} className={classes.btn} color="default" disabled={loading}>
                    <Facebook />
                  </IconButton>
                  <IconButton onClick={onLoginByPhone} className={classes.btn} color="default" disabled={loading}>
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
