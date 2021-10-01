import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { FC } from "react";
import  Button from "@mui/material/Button";
import { ArrowBack } from "@mui/icons-material";

import { Home, SignIn, SignUp } from "pages";

const routers = [
  {
    path: "/",
    exact: true,
    component: Home,
    isPrivate: true,
  },
  {
    path: "/signin",
    exact: true,
    component: SignIn,
    isPrivate: false,
  },
  {
    path: "/signup",
    exact: true,
    component: SignUp,
    isPrivate: false,
  },
];

const AuthorizeRoute: FC<any> = (props) => {
  const { component: Component, ...rest } = props;
  const token = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        token ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

const RootRoute: FC = () => {
  const history = useHistory();
  return (
    <Switch>
      {routers.map((route) =>
        route.isPrivate ? (
          <AuthorizeRoute key={route.path} {...route} />
        ) : (
          <Route
            key={route.path}
            path={route.path}
            component={route.component}
            exact={route.exact}
          />
        )
      )}
      <Route
        path="*"
        component={() => (
          <div className="notfound">
            <h1>Not found</h1>
            <Button
              onClick={() => {
                history.goBack();
              }}
              style={{
                marginTop: 10,
              }}
              startIcon={<ArrowBack />}
              variant="outlined"
              color="primary"
            >
              Back
            </Button>
          </div>
        )}
      />
    </Switch>
  );
};

export default RootRoute;
