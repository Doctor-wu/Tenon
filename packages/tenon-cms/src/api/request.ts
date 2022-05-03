import { useRouter } from "@/router";
import { useStore } from "@/store";
import axios, { AxiosRequestConfig } from "axios";

const prefixUrl = import.meta.env.PROD ? "https://doctorwu.club/tenon" : "http://localhost:9847";

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
      const store = useStore();
      store.dispatch('user/clearUserInfo');
      const router = useRouter();
      router.push('/auth/signIn');
    }
    return Promise.reject(error)
  }
);

type responseType = {
  success: boolean;
  successText: string;
  data: any;
  errorMsg?: string;
}

export const $get = (path: string, params?: any) => {
  if (params) {
    const keys = Object.keys(params);
    if (keys.length) {
      path += '?';
      keys.forEach(key => {
        path += key;
        path += '=';
        path += params[key];
      });
    }
  }
  return requestInstance.get<any, responseType>(prefixUrl + path);
}

export const $post = (path: string, params: any) => {
  return requestInstance.post<any, responseType>(prefixUrl + path, params);
}

export const $put = (path: string, params: any) => {
  return requestInstance.put<any, responseType>(prefixUrl + path, params);
}

export const $delete = (path: string, params: any) => {
  if (params) {
    const keys = Object.keys(params);
    if (keys.length) {
      path += '?';
      keys.forEach(key => {
        path += key;
        path += '=';
        path += params[key];
        path += '&';
      });
    }
  }
  return requestInstance.delete<any, responseType>(prefixUrl + path);
}