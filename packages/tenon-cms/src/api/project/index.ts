import { $delete, $get, $post } from "../request"

const prefix = "/tenon-project";

export const getProjectsApi = () => $get(`${prefix}/getProjects`);

export const addProjectApi = (params) => $post(`${prefix}/addProject`, params);

export const deleteProjectApi = (params) => $delete(`${prefix}/deleteProject`, params);