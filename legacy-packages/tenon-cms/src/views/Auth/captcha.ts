import { getCaptchaApi } from "@/api";
import { Ref, ref } from "vue";

export const useCaptcha: () => [Ref<string>, () => void] = () => {
  const captcha = ref('');
  const updateCaptcha = () => {
    getCaptchaApi().then((data) => {
      captcha.value = data.data;
    });
  }
  return [captcha, updateCaptcha];
}