import { $get, $post } from "../request"

const authPrefix = "/auth/user";

export const getCaptchaApi = () => $get(`${authPrefix}/getCaptcha`);

export const signInApi = (params) => $post(`${authPrefix}/signIn`, params);

export const signupApi = (params) => $post(`${authPrefix}/signup`, params);