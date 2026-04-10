import { AxiosRequestConfig, AxiosResponse } from "axios";

import { axiosInstance } from "./instance";

import { BaseResponse } from "@template/shared";

const Get = async <T, D>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<BaseResponse<T>>> => {
  const response = await axiosInstance.get(url, {
    params: data,
    ...config,
  });
  return response;
};

const Post = async <T, D>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<BaseResponse<T>>> => {
  const response = await axiosInstance.post(url, data, config);
  return response;
};

const Put = async <T, D>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<BaseResponse<T>>> => {
  const response = await axiosInstance.put(url, data, config);
  return response;
};

const Patch = async <T, D>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<BaseResponse<T>>> => {
  const response = await axiosInstance.patch(url, data, config);
  return response;
};

const Delete = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<BaseResponse<T>>> => {
  const response = await axiosInstance.delete(url, config);
  return response;
};

export { Delete, Get, Patch, Post, Put };
