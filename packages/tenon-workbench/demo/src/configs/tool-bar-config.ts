import { ToolBarConfig, ToolBarFlag } from "@tenon/workbench";
import FileTree from "vue-material-design-icons/FamilyTree.vue";
import PaletteSwatch from "vue-material-design-icons/PaletteSwatch.vue";
import ContentCopy from "vue-material-design-icons/ContentCopy.vue";
import { h } from "vue";

export enum ToolBarName {
  Undo = 'Undo',
  Redo = 'Redo',
  Mode = 'Mode',
  RealPreview = 'RealPreview',
  ClearPageConfig = 'ClearPageConfig',
  /** 保存页面配置 */
  SaveConfig = 'SaveConfig',
  ExportConfig = 'ExportConfig',
  LoadConfig = 'LoadConfig',
  Events = 'Events',
  PageStatus = 'PageStatus',
  PageLifeCycle = 'PageLifeCycle',
  MaterialSwitch = 'MaterialSwitch',
  ComponentTreeSwitch = 'ComponentTreeSwitch',
  CopyComponent = 'CopyComponent',
}

export const toolBarConfig: ToolBarConfig = {
  config: [
    [
      {
        name: ToolBarName.Undo,
        flag: ToolBarFlag.Button,
        icon: {
          iconName: 'rollback',
        },
        disabled: true,
        popupText: '撤销',
      },
      {
        name: ToolBarName.Redo,
        flag: ToolBarFlag.Button,
        icon: {
          iconName: 'rollfront',
        },
        popupText: '重做',
      }
    ],
    [
      {
        name: ToolBarName.Mode,
        flag: ToolBarFlag.DropDown,
        text: '编辑模式',
        popupText: '编辑器模式',
        dropDownWidth: '100px',
        icon: {
          iconName: 'edit',
          iconSize: 16,
        },
        listTree: [
          {
            name: 'edit',
            text: '编辑模式',
          },
          {
            name: 'preview',
            text: '预览模式',
          }
        ]
      },
      {
        name: ToolBarName.RealPreview,
        flag: ToolBarFlag.Button,
        text: '真机预览',
        icon: {
          iconName: 'laptop',
          iconSize: 16,
        },
        popupText: '真机预览',
      },
      {
        name: ToolBarName.RealPreview,
        flag: ToolBarFlag.Button,
        text: '清空页面',
        icon: {
          iconName: 'clear',
          iconSize: 16,
        },
        popupText: '清空页面配置',
      }
    ],
    [
      {
        name: ToolBarName.SaveConfig,
        flag: ToolBarFlag.Button,
        text: '保存',
        icon: {
          iconName: 'save',
          iconSize: 16,
        },
        popupText: '保存页面到云端',
      },
      {
        name: ToolBarName.ExportConfig,
        flag: ToolBarFlag.Button,
        text: '导出',
        icon: {
          iconName: 'jump',
          iconSize: 16,
        },
        popupText: '保存页面配置',
      },
      {
        name: ToolBarName.LoadConfig,
        flag: ToolBarFlag.Button,
        text: '加载',
        icon: {
          iconName: 'download',
          iconSize: 16,
        },
        popupText: '加载页面配置',
      },
    ],
    [
      {
        name: ToolBarName.Events,
        flag: ToolBarFlag.Button,
        text: '事件',
        icon: {
          iconName: 'view-module',
          iconSize: 16,
        },
        popupText: '管理页面事件',
      },
      {
        name: ToolBarName.PageStatus,
        flag: ToolBarFlag.Button,
        text: '状态',
        icon: {
          iconName: 'server',
          iconSize: 16,
        },
        popupText: '管理页面状态',
      },
      {
        name: ToolBarName.PageLifeCycle,
        flag: ToolBarFlag.Button,
        text: '生命周期',
        icon: {
          iconName: 'control-platform',
          iconSize: 16,
        },
        popupText: '管理页面生命周期',
      },
    ],
    [
      {
        name: ToolBarName.MaterialSwitch,
        flag: ToolBarFlag.Switch,
        text: '物料面板',
        icon: {
          iconRender: () => h(PaletteSwatch, {
            size: 16,
          }),
        },
        active: true,
        popupText: '展示物料面板',
      },
      {
        name: ToolBarName.ComponentTreeSwitch,
        flag: ToolBarFlag.Switch,
        text: '组件树面板',
        icon: {
          iconRender: () => h(FileTree, {
            size: 16,
          }),
        },
        active: false,
        popupText: '展示组件树面板',
      },
    ],
    [
      {
        name: ToolBarName.CopyComponent,
        flag: ToolBarFlag.Button,
        text: '复制',
        icon: {
          iconRender: () => h(ContentCopy, {
            size: 16,
          }),
        },
        popupText: '复制组件',
      },
    ],
  ],
  alignment: 'center',
};