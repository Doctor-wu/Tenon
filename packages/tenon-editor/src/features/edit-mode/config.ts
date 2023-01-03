import { ToolBarItemType } from "@tenon/workbench";
import EyeOutLine from "vue-material-design-icons/EyeOutLine.vue";
import PencilOutLine from "vue-material-design-icons/PencilOutLine.vue";
import { h } from "vue";

export const previewModeConfig: Partial<ToolBarItemType> = {
  text: '预览模式',
  icon: {
    iconRender: () => h(EyeOutLine, {
      size: 16,
    }),
  },
};

export const editModeConfig: Partial<ToolBarItemType> = {
  text: '编辑模式',
  icon: {
    iconRender: () => h(PencilOutLine, {
      size: 16,
    }),
  },
};
