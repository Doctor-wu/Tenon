export type BuildMode = 'dev' | 'prod' | 'local';

export class BaseConfig {
  mode: BuildMode;
  appName = 'tenon-editor';
  basePath: string = '';
  assetDir: string = 'assets';

  toObject() {
    return {
      mode: this.mode,
      appName: this.appName,
      basePath: this.basePath,
      assetDir: this.assetDir,
      isDev: this.isDev,
      isProd: this.isProd,
      isLocal: this.isLocal,
    };
  }

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
