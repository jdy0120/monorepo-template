import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { Get } from "./request";

// Request interceptor
const insertAccessToken = (config: InternalAxiosRequestConfig) => {
  // const token = sessionStorage.getItem("persist:root");
  // // Check if token exists and is valid
  // let accessToken;
  // try {
  //   const login = token ? JSON.parse(token).login : null;
  //   accessToken = JSON.parse(login)?.accessToken;
  // } catch (error) {
  //   console.error("Failed to parse token:", error);
  //   accessToken = null; // Ensure accessToken is null on error
  // }

  // if (config.headers && accessToken) {
  //   config.headers.authorization = `Bearer ${accessToken}`;
  // }

  return config;
};

//response interceptor
const refreshAccessToken = async (response: AxiosResponse) => {
  // if (response.status === 401) {
  //   const token = sessionStorage.getItem("login");
  //   const refreshTokenInStorage = JSON.parse(token || "").state.refreshToken;
  //   try {
  //     const accessTokenResponse = await Get<LoginResponse>("/auth/refresh", {
  //       params: {
  //         refreshtoken: refreshTokenInStorage,
  //       },
  //     });
  //     const accessToken = accessTokenResponse.data.data.accessToken;
  //     const refreshToken = accessTokenResponse.data.data.refreshToken;

  //     console.log(accessTokenResponse);
  //     sessionStorage.setItem("persist:root", JSON.stringify({ state: { accessToken, refreshToken } }));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return response;
};

export { insertAccessToken, refreshAccessToken };
