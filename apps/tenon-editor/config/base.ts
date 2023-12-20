export type BuildMode = 'dev' | 'prod' | 'local';

export class BaseConfig {
  mode: BuildMode;
  appName = 'tenon-editor';
  basePath: string = '';
  assetDir: string = 'assets';

  get isDev() {
    return this.mode === 'dev';
  }

  get isProd() {
    return this.mode === 'prod';
  }

  get isLocal() {
    return this.mode === 'local';
  }
}
