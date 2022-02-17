import axios, { AxiosRequestConfig } from "axios";

const prefixUrl = "http://localhost:9999";

const networkConfig: AxiosRequestConfig = {
  headers: {
      'Content-Type': 'application/json'
  },
  withCredentials: true,
  timeout: 40000
};

const requestInstance = axios.create(networkConfig);

requestInstance.interceptors.request.use(
  config => {

    // TODO
    // if (getToken()) {}
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error);
  }
);

requestInstance.interceptors.response.use(
  response => {
    const res = response.data;
    return res;
  },
  error => {
    const code = error.response?.status
    if (code === 403) {
      // TODO 登陆态失效
    }
    return Promise.reject(error)
  }
);

export const $get = (path: string, params?: any) => {
  return requestInstance.get(prefixUrl + path, params);
}

export const $post = (path: string, params: any) => {
  return requestInstance.post(prefixUrl + path, params);
}

export const $put = (path: string, params: any) => {
  return requestInstance.put(prefixUrl + path, params);
}

export const $delete = (path: string, params: any) => {
  return requestInstance.delete(prefixUrl + path, params);
}