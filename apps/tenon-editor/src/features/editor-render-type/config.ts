import { IToolBarSwitchConfig } from "@tenon/workbench";
import { h } from "vue";
import { EditorRenderType } from "./editor-render-type.interface";

export const ReactIconConfig: Partial<IToolBarSwitchConfig> = {
  text: 'React',
  icon: {
    iconRender: () => h('div', {
      class: 'i-logos:react'
    }),
  },
};

export const VueIconConfig: Partial<IToolBarSwitchConfig> = {
  text: 'Vue',
  icon: {
    iconRender: () => h('div', {
      class: 'i-logos:vue'
    }),
  },
};

export const renderTypeConfigMap: Map<EditorRenderType, Partial<IToolBarSwitchConfig>> = new Map([
  [EditorRenderType.React, ReactIconConfig],
  [EditorRenderType.Vue, VueIconConfig],
]);
