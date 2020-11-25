import axios from "axios";
//config
import * as config from "../config";
const getToken = () => {
    const userData = localStorage.getItem("userData");
    if (userData) {
        const { token } = JSON.parse(userData);
        if (token) {
            return token;
        } else return undefined;
    }
    return undefined;
};
export const httpRequest = async (url: string, method: "GET" | "POST" | "DELETE" | "PUT", data?: any) => {
    await refreshToken();

    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${getToken()}`,
    };

    return axios({
        url: `${config.API_ROOT}/${url}`,
        method,
        headers,
        data,
    });
};

const refreshToken = async () => {
    const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData") || "") : null;

    if (userData && userData.expires_in - Date.now() < 10 * 60 * 1000) {
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };

        const data = {
            refresh_token: userData.refresh_token,
        };

        return await axios({
            url: `${config.API_ROOT}/api/auth/refresh`,
            method: "POST",
            data: data,
            headers,
        })
            .then((result) => {
                const { token, refresh_token } = result.data;
                localStorage.setItem(
                    "userData",
                    JSON.stringify({
                        token,
                        refresh_token,
                        expires_in: Date.now() + 60 * 60 * 1000,
                    }),
                );
            })
            .catch((err) => {
                //   check401(err);
                console.log(err);
                localStorage.removeItem("userData");
            });
    }
};

export const check401 = (err: { response: { status: number } }) => {
    if (err.response.status === 401) {
        localStorage.removeItem("userData");
        document.location.reload();
        return;
    }
};
