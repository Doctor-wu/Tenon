export type BuildMode = 'dev' | 'prod' | 'local';

export class BaseConfig {
  appName: 'tenon-editor';
  mode: BuildMode;
  basePath: string = '';
  assetDir: string = 'assets';
}
