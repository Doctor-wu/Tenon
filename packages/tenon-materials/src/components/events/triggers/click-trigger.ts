import { IMaterialEventMeta } from "../event-meta";

export const clickTrigger: IMaterialEventMeta["trigger"] = (el, trigger) => {
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    trigger(e);
  });
}

export const doubleClickTrigger: IMaterialEventMeta["trigger"] = (el, trigger) => {
  const duration = 300;
  let timer: ReturnType<typeof setTimeout> | undefined;
  el.addEventListener('click', (e) => {
    e.stopPropagation();
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
