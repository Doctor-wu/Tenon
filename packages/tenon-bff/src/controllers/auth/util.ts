import crypto from 'crypto';
import captcha from "svg-captcha";

export const confusePwd = (pwd: string) => {
  return crypto.createHash("md5").update(pwd).digest("hex");
}

export const useCaptcha = () => {
  const result =  captcha.create({
    size: 4,
    ignoreChars: "0o1iIl",
    noise: 3,
    color: true,
    background: "#fff",
    fontSize: 60
  });
  return result;
}