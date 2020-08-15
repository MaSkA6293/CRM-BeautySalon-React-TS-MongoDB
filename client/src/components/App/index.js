import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles.scss";
import Spiner from "../Spiner";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { purple } from "@material-ui/core/colors";
import { useRoutes } from "../../routes";
import { useSelector, useDispatch } from "react-redux";
import {
  authHandler,
  userReady,
} from "../../pages/AuthPage/actions/actionUser";

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: purple[500],
      contrastText: "#fff",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});

const App = () => {
  const dispatch = useDispatch();
  const { userIsLogined, checkUser } = useSelector(({ user }) => {
    return {
      userIsLogined: user.userIsLogined,
      checkUser: user.userReady,
    };
  });
  useEffect(() => {
    dispatch(userReady(false));
    const data = JSON.parse(localStorage.getItem("userData") || "[]");
    if (data && data.token) {
      dispatch(authHandler(data.token, data.id));
    } else {
      dispatch(userReady(true));
    }
  }, [dispatch]);

  const routes = useRoutes(userIsLogined);
  if (!checkUser) {
    return <Spiner />;
  }
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<Spiner />}>
          <ThemeProvider theme={theme}>{routes}</ThemeProvider>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
