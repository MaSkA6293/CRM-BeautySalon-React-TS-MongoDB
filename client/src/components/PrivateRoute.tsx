import React from "react";
import { Route, Redirect } from "react-router-dom";

type PrivateRouteProps = {
  component: React.FunctionComponent;
  userIsLogined: boolean;
};
const PrivateRoute = ({ component, ...rest }: PrivateRouteProps) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        rest.userIsLogined ? (
          component
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
