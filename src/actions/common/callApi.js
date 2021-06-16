import axios from "axios";
import { getCookie } from "./utils";

const callApi = function callApi(pathUrl, options) {
  const accessToken = getCookie("_accessToken");
  const domain = "http://localhost:8001/";
  options.mode = "cors";
  if (accessToken) {
    options.headers = {
      Authorization: "Bearer " + accessToken,
      TIMESTAMP: new Date().getTime(),
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, PUT, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    };
  } else {
    options.headers = {
      "Content-Type": "application/json",
      TIMESTAMP: new Date().getTime(),
      Accept: "*/*",
    };
  }

  options.url = domain + String(pathUrl);

  return axios(options).then(
    (response) => {
      console.log("Call-API => response", response);
      const data = response && response.data ? response.data : {};
      return {
        data: data,
        code: Number(response.status),
        message: response && response.statusText,
      };
    },
    (error) => {
      console.log(options.url, "callApi -> error=", error);
      return error;
    }
  );
};

export default callApi;
