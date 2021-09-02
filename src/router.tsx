import { Route, Switch, Redirect } from "react-router-dom";
import { FC } from "react";

import { Home, Login } from "pages";

const routers = [
  {
    path: "/",
    exact: true,
    component: Home,
    isPrivate: true,
  },
  {
    path: "/login",
    exact: true,
    component: Login,
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
              pathname: "/login",
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

const RootRoute = () => {
  return (
    <Switch>
      {routers.map((ele) =>
        ele.isPrivate ? (
          <AuthorizeRoute {...ele} />
        ) : (
          <Route path={ele.path} component={ele.component} exact={ele.exact} />
        )
      )}
    </Switch>
  );
};

export default RootRoute;
