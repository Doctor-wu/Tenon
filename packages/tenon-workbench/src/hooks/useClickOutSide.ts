type clickOutSideGetter = (ev: MouseEvent) => boolean;

export const getClickOutSideByParentClassName: (cls: string) => clickOutSideGetter = (cls) => (ev) => {
  let parent: HTMLElement | null = ev.target as HTMLElement;
  while (parent) {
    if (parent.classList.contains(cls)) return false;
    parent = parent.parentElement;
  }
  return true;
}

export const useClickOutSide = (isClickOutSide: clickOutSideGetter, cb: Function) => {
  const controller = new AbortController();
  document.addEventListener('click', (ev) => {
    if (isClickOutSide(ev)) {
      cb(ev);
      controller.abort();
    }
  }, {
    signal: controller.signal,
  });
  return controller;
}
