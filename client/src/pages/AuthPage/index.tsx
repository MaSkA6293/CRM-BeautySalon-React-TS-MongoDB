import React, { useEffect } from "react";
import "./styles.scss";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { runSignUp } from "../../ducks/user/actionCreators/signUp";
import { runSignIn } from "../../ducks/user/actionCreators/signIn";
import { useSelector, useDispatch } from "react-redux";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Message from '../../components/Message'
import {
  selectuserIsLoading,
  selectuserCreateError,
  selectuserIsLogining,
  selectuserLoginingError,
  selectuserCreateSuccess
} from "../../ducks/user/selector"
interface AuthPageProps {
  signIn?: boolean,
  signUp?: boolean,
  variant?: boolean
}

export const AuthPage: React.FC<AuthPageProps> = ({ signIn, signUp, variant }: AuthPageProps): React.ReactElement => {

  const userIsLoading = useSelector(selectuserIsLoading)
  const userCreateError = useSelector(selectuserCreateError)
  const userIsLogining = useSelector(selectuserIsLogining)
  const userLoginingError = useSelector(selectuserLoginingError)
  const userCreateSuccess = useSelector(selectuserCreateSuccess)

  const dispatch = useDispatch();

  const signUpHandler = (values: { email: string; password: string; confirmPassword: string }) => {
    dispatch(runSignUp(values));
  };
  const signInHandler = (values: { email: string; password: string }) => {
    dispatch(runSignIn(values));
  };
  const history = useHistory()
  useEffect(() => {
    if (userCreateSuccess) {
      setTimeout(() => {
        history.push('/signIn')
      }, 4000)
    }
  }, [userCreateSuccess, history])


  return (
    <>
      { userCreateSuccess && <Message isOpen status={'success'} message={userCreateSuccess} />}
      { userCreateError && <Message isOpen status={'error'} message={userCreateError} />}
      { userLoginingError && <Message isOpen status={'error'} message={userLoginingError} />}

      <div className="contaner">
        <div className="auth">
          <h1 className="auth__title">Авторизация</h1>
          {variant && <div className="auth__variant">
            <div className="auth__signIn">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={() => {
                  history.push('/signIn')
                }}
              >
                Войти
            </Button>
            </div>
            <div className="auth__signUp">
              <Button
                variant="contained"
                type="submit"
                onClick={() => {
                  history.push('/signUp')
                }}
              >
                Регистрация
            </Button>
            </div>
          </div>
          }
          {signIn && <SignIn
            userIsLogining={userIsLogining}
            signIn={signInHandler}
          />
          }
          {signUp && <SignUp
            userIsLoading={userIsLoading}
            signUp={signUpHandler}
          />}
        </div>
      </div>
    </>
  );
};

export default AuthPage;
