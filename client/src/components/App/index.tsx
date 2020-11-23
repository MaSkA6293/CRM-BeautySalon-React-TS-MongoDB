import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles.scss";
import Spiner from "../Spiner";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { purple } from "@material-ui/core/colors";
import { useRoutes } from "../../routes";
import { useSelector, useDispatch } from "react-redux";
import { runGetUser } from '../../ducks/user/actionCreators/getUser'
import { selectIsAuth, selectStatusUser } from '../../ducks/user/selector'
import { UserStatus } from '../../ducks/user/contracts/state'
const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
      contrastText: "#fff",
    },
    secondary: {
      main: "#black",
    },
  },
});

const App: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth)
  const statusUser = useSelector(selectStatusUser)
  useEffect(() => {
    dispatch(runGetUser());
  }, [dispatch]);
  const routes = useRoutes(isAuth);

  if (statusUser === UserStatus.NOT_READY) {
    return <Spiner />
  }
  return (
    <div className="app">
      <Router>
        <Suspense fallback={<Spiner />}>
          <ThemeProvider theme={theme}>{routes}</ThemeProvider>
        </Suspense>
      </Router>
    </div>
  );


};

export default App;
