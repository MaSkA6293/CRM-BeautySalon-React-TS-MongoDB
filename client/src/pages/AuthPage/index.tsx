import React, { useEffect } from "react";
import "./styles.scss";

import { registerHandler, sugnInHandler } from "./actions/actionUser";
import { IGlobalStore } from "../../reducers/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import cogoToast from "cogo-toast";
import Spiner from "../../components/Spiner";
import AuthForm from "./components/Authform";
export const AuthPage = () => {
  const {
    userIsLoading,
    userLoaded,
    userGetIsFail,
    userGetError,
    userIsLogining,
    userLoginIsFail,
    userLoginError,
  }: any = useSelector(({ user }: IGlobalStore) => {
    return {
      userIsLoading: user.userIsLoading,
      userLoaded: user.userLoaded,
      userGetIsFail: user.userGetIsFail,
      userGetError: user.userGetError,
      userIsLogining: user.userIsLogining,
      userLoginIsFail: user.userLoginIsFail,
      userLoginError: user.userLoginError,
    };
  });
  useEffect(() => {
    userLoaded &&
      cogoToast.success(
        <div className="message">Пользователь успешно создан</div>
      );
  }, [userLoaded]);

  useEffect(() => {
    userGetIsFail &&
      cogoToast.error(<div className="message">{userGetError}</div>);
  }, [userGetIsFail, userGetError]);

  useEffect(() => {
    userLoginIsFail &&
      cogoToast.error(<div className="message">{userLoginError}</div>);
  }, [userLoginIsFail, userLoginError]);

  const dispatch = useDispatch();

  const signUp = (values: any) => {
    console.log("Перед диспатч", values);
    dispatch(registerHandler(values));
  };
  const signIn = (values: any) => {
    dispatch(sugnInHandler(values));
  };

  return (
    <div className="contaner">
      <div className="Auth">
        <h1 className="Auth__title">Авторизация</h1>
        <AuthForm
          userIsLoading={userIsLoading}
          userIsLogining={userIsLogining}
          signIn={signIn}
          signUp={signUp}
        />
        {userIsLoading || (userIsLogining && <Spiner />)}
      </div>
    </div>
  );
};

export default AuthPage;
