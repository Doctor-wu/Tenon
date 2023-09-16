import ReactIcon from "vue-material-design-icons/React.vue";
import VueIcon from "vue-material-design-icons/Vuejs.vue";
import { IToolBarSwitchConfig } from "@tenon/workbench";
import { h } from "vue";
import { EditorRenderType } from "./editor-render-type.interface";

export const ReactConfig: Partial<IToolBarSwitchConfig> = {
  text: 'React',
  icon: {
    iconRender: () => h(ReactIcon, {
      size: 16,
    }),
  },
};

export const VueConfig: Partial<IToolBarSwitchConfig> = {
  text: 'Vue',
  icon: {
    iconRender: () => h(VueIcon, {
      size: 16,
    }),
  },
};

export const renderTypeConfigMap: Map<EditorRenderType, Partial<IToolBarSwitchConfig>> = new Map([
  [EditorRenderType.React, ReactConfig],
  [EditorRenderType.Vue, VueConfig],
]);
