import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles.scss";
import Spiner from "../Spiner";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { purple } from "@material-ui/core/colors";
import { useRoutes } from "../../routes";
import { useAuth } from "../../utils/useAuth.hook";
//import { useSelector } from "react-redux";
import { AuthContext } from "../../context/AuthContext";
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
  // const { userData } = useSelector(({ user }) => {
  //   return {
  //     userData: user,
  //   };
  // });
  const { logIn, logOut, token } = useAuth();
  const isAuntenticated = !!token;
  const routes = useRoutes(isAuntenticated);
  return (
    <div className="App">
      <AuthContext.Provider value={{ token, logIn, logOut, isAuntenticated }}>
        <Router>
          <Suspense fallback={<Spiner />}>
            <ThemeProvider theme={theme}>{routes}</ThemeProvider>
          </Suspense>
        </Router>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
