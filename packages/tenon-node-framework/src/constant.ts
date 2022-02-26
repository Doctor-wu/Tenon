export const CONSTANT = {
  defaultServerName: "tenon-server",
  defaultServerAddress: "mongodb://localhost:27017/tenon",
  defaultSessionConfig: {
    key: 'dtwu:ssid', // cookie键名
    maxAge: 86400 * 1000, // 有效期
    httponly: true, // 仅服务器修改
    signed: true, // 签名cookie
    renew: true,
    /** cookie快过期时自动重新设置*/
  },
  defaultCorsConfig: {
    credentials: true,
  }
}