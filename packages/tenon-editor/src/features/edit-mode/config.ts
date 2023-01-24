import { IToolBarSwitchConfig } from "@tenon/workbench";
import EyeOutLine from "vue-material-design-icons/EyeOutLine.vue";
import PencilOutLine from "vue-material-design-icons/PencilOutLine.vue";
import { h } from "vue";
import { ModeType } from "./edit-mode.interface";

export const previewModeConfig: Partial<IToolBarSwitchConfig> = {
  text: '预览模式',
  icon: {
    iconRender: () => h(EyeOutLine, {
      size: 16,
    }),
  },
};

export const editModeConfig: Partial<IToolBarSwitchConfig> = {
  text: '编辑模式',
  icon: {
    iconRender: () => h(PencilOutLine, {
      size: 16,
    }),
  },
};

export const configModeMap: Map<ModeType, Partial<IToolBarSwitchConfig>> = new Map([
  [ModeType.Edit, editModeConfig],
  [ModeType.Preview, previewModeConfig],
]);