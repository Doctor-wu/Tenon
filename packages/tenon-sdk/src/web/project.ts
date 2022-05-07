import { TenonWebSDK } from "./app";

export interface IProjectInfo {
  belongUserId: string;
  createTime: string;
  projectName: string;
  userConfig: { screenWidth: number; _id: string; };
}

export class TenonSDKProject {
  projectInfo?: IProjectInfo;
  app: TenonWebSDK;

  constructor(app: TenonWebSDK) {
    this.app = app;
  }

  async init() {
    this.projectInfo = await this.getProjectInfoFromRemote();
  }

  async getProjectInfoFromRemote() {
    const res = await (await fetch(`${this.app.config.mode === 'prod' ? 'https://doctorwu.club/tenonbff/' : (this.app.config.prefix || '/')}getSDKProjectInfo?projectId=${this.app.page.pageInfo.value.belongProjectId}`)).json();
    return res.filter(Boolean)[0];
  }
}