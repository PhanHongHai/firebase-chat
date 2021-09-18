import React, { FC, useState } from "react";
import { TextField, Button, Box } from "@material-ui/core";
import { useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "redux/store";
import AuthStyles from "./styles";

import { AuthRepository } from "redux/repository";

type FormValues = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().required("Email is required!").email("Email invalid!"),
  password: yup.string().required("Password is required!"),
});

const SignUp: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const classes = AuthStyles();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const history = useHistory();

  /**
   * handle submit form signup
   * @param data form data
   */
  const onSubmit = async (data: FormValues) => {
    if (data) {
      setLoading(true);
      dispatch(AuthRepository.signupRequest(data))
        .then(() => {
          history.push("/");
        })
        .finally(() => {
          setLoading(false);
        });
    }
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
                  <div>
                    <Button
                      onClick={handleSubmit(onSubmit)}
                      variant="contained"
                      color="primary"
                      disabled={loading}
                    >
                      SignUp
                    </Button>
                    <Button
                      onClick={() => {
                        history.push("/signin");
                      }}
                      variant="contained"
                      color="secondary"
                      disabled={loading}
                    >
                      SignIn
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default SignUp;
