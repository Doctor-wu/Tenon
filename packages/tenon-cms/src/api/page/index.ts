import { $delete, $get, $post } from "../request"

const prefix = "/tenon-page";

export const getPagesApi = (projectId) => $get(`${prefix}/getPages/${projectId}`);

export const getPageInfoApi = (pageId) => $get(`${prefix}/getPageInfo/${pageId}`)

export const addPageApi = (params) => $post(`${prefix}/addPage`, params);

export const deletePageApi = (params) => $delete(`${prefix}/deletePage`, params);