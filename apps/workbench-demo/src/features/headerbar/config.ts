import { ToolBarItemType } from "@tenon/workbench/typings";
import { h } from "vue";
import PencilOutLine from "vue-material-design-icons/PencilOutLine.vue";
import EyeOutLine from "vue-material-design-icons/EyeOutLine.vue";

export const EditModeConfig: Partial<ToolBarItemType> = {
  name: 'edit',
  text: '编辑模式',
  icon: {
    iconRender: () => h(PencilOutLine, {
      size: 16,
    }),
  },
};

export const PreviewModeConfig: Partial<ToolBarItemType> = {
  name: 'preview',
  text: '预览模式',
  icon: {
    iconRender: () => h(EyeOutLine, {
      size: 16,
    }),
  },
}
  ;