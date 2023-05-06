import { IMaterialEventMeta } from "../../base-component";

export const clickTrigger: IMaterialEventMeta["trigger"] = (el, trigger) => {
  el.addEventListener('click', trigger);
}

export const doubleClickTrigger: IMaterialEventMeta["trigger"] = (el, trigger) => {
  const duration = 300;
  let timer: ReturnType<typeof setTimeout> | undefined;
  el.addEventListener('click', (e) => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
      trigger(e);
    } else {
      timer = setTimeout(() => {
        timer = undefined;
      }, duration);
    }
  });
}
