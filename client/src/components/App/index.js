import React, { Suspense, lazy } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles.scss";
import Spiner from "../Spiner";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { purple } from "@material-ui/core/colors";

import Test from "../Test";

const Home = lazy(() => import("../Home"));
const Jornal = lazy(() => import("../Jornal/Jornal"));
const Clients = lazy(() => import("../../pages/Clients"));
const Services = lazy(() => import("../Services/Services"));

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: purple[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});

const App = () => {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<Spiner />}>
          <ThemeProvider theme={theme}>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/jornal">
                <Jornal />
              </Route>
              <Route path="/services">
                <Services />
              </Route>
              <Route path="/clients">
                <Clients />
              </Route>
              <Route path="/test">
                <Test />
              </Route>
            </Switch>
          </ThemeProvider>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
