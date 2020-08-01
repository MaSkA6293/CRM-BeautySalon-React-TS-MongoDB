import axios from "axios";

//config
import * as config from "../config";

export const httpRequest = (
  url: string,
  method: "GET" | "POST" | "DELETE" | "PUT",
  data?: any
) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  return axios({
    url: `${config.API_ROOT}/${url}`,
    method,
    headers,
    data,
  });
};

export const checkResponse = (response: IResponse) => {
  if (response.status === 200) {
    return true;
  }

  throw new Error(response.statusText);
};

interface IResponse {
  status: number;
  statusText: string;
}
