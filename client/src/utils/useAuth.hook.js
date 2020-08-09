import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { USER_LOGIN_SUCCESS } from "../constants";
export const useAuth = () => {
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();

  const logIn = useCallback(
    (jwtToken, id) => {
      setToken(jwtToken);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: { token: jwtToken, id },
      });
      localStorage.setItem("userData", JSON.stringify({ token: jwtToken, id }));
    },
    [dispatch]
  );

  const logOut = useCallback(() => {
    setToken(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));

    if (data && data.token) {
      logIn(data.token, data.id);
    }
  }, [logIn]);

  return { logIn, logOut, token };
};
