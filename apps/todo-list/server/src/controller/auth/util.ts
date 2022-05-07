import crypto from 'crypto';

export const confusePwd = (pwd: string) => {
  return crypto.createHash("md5").update(pwd).digest("hex");
}