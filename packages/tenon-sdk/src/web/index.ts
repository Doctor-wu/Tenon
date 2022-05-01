import { ITenonWebSDKConfig, TenonWebSDK } from "./app"

export const createTenonApp = (config: ITenonWebSDKConfig) => {
  return new TenonWebSDK(config);
};
