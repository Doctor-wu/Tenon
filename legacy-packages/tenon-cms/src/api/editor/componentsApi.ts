import { $get } from "../request"

const componentsPrefix = "/components";

export const getComponentsApi = () => $get(`${componentsPrefix}/getComponents`);

export const getPageTreesApi = (pageId) => $get(`${componentsPrefix}/getPageTrees/${pageId}`);