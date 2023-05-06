import { IToolBarSwitchConfig, ToolBarConfig, ToolBarFlag } from "@tenon/workbench";
import FileTree from "vue-material-design-icons/FamilyTree.vue";
import PaletteSwatch from "vue-material-design-icons/PaletteSwatch.vue";
import FormatListText from "vue-material-design-icons/FormatListText.vue";
import EyeOutLine from "vue-material-design-icons/EyeOutLine.vue";
import PencilOutLine from "vue-material-design-icons/PencilOutLine.vue";
import MonitorShimmer from "vue-material-design-icons/MonitorShimmer.vue";
import LapTop from "vue-material-design-icons/LapTop.vue";
import ContentSave from "vue-material-design-icons/ContentSave.vue";
import FileDownLoadOutLine from "vue-material-design-icons/FileDownLoadOutLine.vue";
import FileUploadOutLine from "vue-material-design-icons/FileUploadOutLine.vue";
import CalendarTextOutLine from "vue-material-design-icons/CalendarTextOutLine.vue";
import StateMachine from "vue-material-design-icons/StateMachine.vue";
import VectorCircle from "vue-material-design-icons/VectorCircle.vue";
import { h } from "vue";

export enum ToolBarName {
  Undo = 'Undo',
  Redo = 'Redo',
  Mode = 'Mode',
  PreviewMode = 'PreviewMode',
  EditMode = 'EditMode',
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
  ComponentProperty = 'ComponentProperty',
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
        dropDownWidth: '120px',
        icon: {
          iconRender: () => h(PencilOutLine, {
            size: 16,
          }),
        },
        listTree: [
          {
            name: ToolBarName.EditMode,
            text: '编辑模式',
            icon: {
              iconRender: () => h(PencilOutLine, {
                size: 16,
              }),
            },
          },
          {
            name: ToolBarName.PreviewMode,
            text: '预览模式',
            icon: {
              iconRender: () => h(EyeOutLine, {
                size: 16,
              }),
            },
          }
        ]
      },
      {
        name: ToolBarName.RealPreview,
        flag: ToolBarFlag.Button,
        text: '真机预览',
        icon: {
          iconRender: () => h(LapTop, {
            size: 16,
          }),
        },
        popupText: '真机预览',
      },
      {
        name: ToolBarName.RealPreview,
        flag: ToolBarFlag.Button,
        text: '清空页面',
        icon: {
          iconRender: () => h(MonitorShimmer, {
            size: 16,
          }),
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
          iconRender: () => h(ContentSave, {
            size: 16,
          }),
        },
        popupText: '保存页面到云端',
      },
      {
        name: ToolBarName.ExportConfig,
        flag: ToolBarFlag.Button,
        text: '导出',
        icon: {
          iconRender: () => h(FileUploadOutLine, {
            size: 16,
          }),
        },
        popupText: '导出页面配置',
      },
      {
        name: ToolBarName.LoadConfig,
        flag: ToolBarFlag.Button,
        text: '导入',
        icon: {
          iconRender: () => h(FileDownLoadOutLine, {
            size: 16,
          }),
        },
        popupText: '导入页面配置',
      },
    ],
    [
      {
        name: ToolBarName.Events,
        flag: ToolBarFlag.Button,
        text: '事件',
        icon: {
          iconRender: () => h(CalendarTextOutLine, {
            size: 16,
          }),
        },
        popupText: '管理页面事件',
      },
      {
        name: ToolBarName.PageStatus,
        flag: ToolBarFlag.Button,
        text: '状态',
        icon: {
          iconRender: () => h(StateMachine, {
            size: 16,
          }),
        },
        popupText: '管理页面状态',
      },
      {
        name: ToolBarName.PageLifeCycle,
        flag: ToolBarFlag.Button,
        text: '生命周期',
        icon: {
          iconRender: () => h(VectorCircle, {
            size: 16,
          }),
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
        activeStyle: {
          fontWeight: 'bold'
        },
        popupText: (config) => `${!config.active ? '展开' : '收起'}物料面板`,
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
        activeStyle: {
          color: '#11bb88',
          fontWeight: 'bold'
        },
        active: false,
        popupText: (config) => `${!config.active ? '展开' : '收起'}组件树面板`,
      },
    ],
    [
      {
        name: ToolBarName.ComponentProperty,
        flag: ToolBarFlag.Switch,
        text: '组件属性',
        icon: {
          iconRender: () => h(FormatListText, {
            size: 16,
          }),
        },
        activeStyle: {
          fontWeight: 'bold'
        },
        active: false,
        popupText: '展示组件属性面板',
      }
    ]
  ],
  alignment: 'center',
};
