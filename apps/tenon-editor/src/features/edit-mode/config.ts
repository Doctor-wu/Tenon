import { IToolBarSwitchConfig } from "@tenon/workbench";
import EyeOutLine from "vue-material-design-icons/EyeOutline.vue";
import PencilOutLine from "vue-material-design-icons/PencilOutline.vue";
import { h } from "vue";
import { EditModeType } from "./edit-mode.interface";

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

export const configModeMap: Map<EditModeType, Partial<IToolBarSwitchConfig>> = new Map([
  [EditModeType.Edit, editModeConfig],
  [EditModeType.Preview, previewModeConfig],
]);
