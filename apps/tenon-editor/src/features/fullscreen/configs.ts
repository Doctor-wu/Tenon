import { h } from "vue";
import FullScreen from "vue-material-design-icons/Fullscreen.vue";
import ExitFullScreen from "vue-material-design-icons/FullscreenExit.vue";
import { IFootBarItem } from "@tenon/workbench";


export const FullScreenConfig: Partial<IFootBarItem> = {
  icon: {
    iconRender: () => h(FullScreen, {
      size: 24,
    }),
  },
  popupText: '全屏',
};

export const ExitFullScreenConfig: Partial<IFootBarItem> = {
  icon: {
    iconRender: () => h(ExitFullScreen, {
      size: 24,
    }),
  },
  popupText: '退出全屏',
};
