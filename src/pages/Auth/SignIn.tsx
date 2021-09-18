import React, { FC, useState } from "react";
import { TextField, Button, Box, Divider, IconButton } from "@material-ui/core";
import { useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Facebook, Phone } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import { useAppDispatch } from "redux/store";

import LoginStyles from "./styles";

import { AuthRepository } from "redux/repository";

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

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
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
                    disabled={loading}
                  >
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
                <p>Other login with</p>
                <Grid item xs={12}>
                  <IconButton
                    onClick={onLoginByGoogle}
                    className={classes.btn}
                    color="default"
                    disabled={loading}
                  >
                    G
                  </IconButton>
                  <IconButton
                    onClick={onLoginByFacebook}
                    className={classes.btn}
                    color="default"
                    disabled={loading}
                  >
                    <Facebook />
                  </IconButton>
                  <IconButton
                    className={classes.btn}
                    color="default"
                    disabled={loading}
                  >
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
