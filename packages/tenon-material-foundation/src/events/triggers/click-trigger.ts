import { IMaterialEventMeta } from "../event-meta";

export const clickTrigger: IMaterialEventMeta["trigger"] = (el, trigger) => {
  const controller = new AbortController();
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    trigger(e);
  }, {
    signal: controller.signal,
  });
  return () => {
    controller.abort();
  }
}

export const doubleClickTrigger: IMaterialEventMeta["trigger"] = (el, trigger) => {
  const controller = new AbortController();
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
  }, {
    signal: controller.signal,
  });
  return () => {
    controller.abort();
  }
}
