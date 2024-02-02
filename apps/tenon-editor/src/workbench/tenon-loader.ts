import { IWorkbenchAdapter, WorkbenchLoader, WorkbenchSettings } from "@tenon/workbench"
import "@tenon/workbench/lib/style.css";
import { footBarConfig } from "@/configs/foot-bar-config";
import { headerBarConfig } from "@/configs/header-bar-config";
import { ToolBarName, toolBarConfig } from "@/configs/tool-bar-config";
import { controllers, dynamicTags, syncFeatures } from "@/features";
import { TenonEditor } from "@/core/editor";
import { App, createApp, watch } from "vue";
import ReactDom from "react-dom";
import EditorView from "./editor-view.vue";
import { EditorViewReact } from "./editor-view.react";
import { createElement } from "react";
import { Logger } from "@/utils/logger";
import { TenonStore, getStoreValue } from "@/core";
import { StoreKey } from "@/store";
import { EditorRenderType } from "@/features/editor-render-type";
import { sleep } from "@tenon/shared";

@WorkbenchSettings({
  dynamicTags: dynamicTags,
  syncFeatures: syncFeatures,
  controllers: controllers,
  footBarConfig: footBarConfig,
  headerBarConfig: headerBarConfig,
  toolBarConfig: toolBarConfig,
})
export class TenonEditorAdapter extends WorkbenchLoader implements IWorkbenchAdapter {
  public root: HTMLElement;
  public vueApp?: App<Element>;
  private currentRenderType?: EditorRenderType;

  constructor(
    public editor: TenonEditor,
  ) {
    super();
  }

  load(el) {
    super.load(el);
    this.root = el;
  }

  attachEditor(dom: HTMLElement): void {
    watch(getStoreValue(StoreKey.EditorRenderType), (type: EditorRenderType) => {
      if (type === EditorRenderType.React) {
        this.renderInReact(dom);
      } else {
        this.renderInVue(dom);
      }
      this.barConfig.setToolBarItemLoading(ToolBarName.RenderType, true);
      sleep(200).then(() => {
        this.barConfig.setToolBarItemLoading(ToolBarName.RenderType, false);
      })
    }, {
      immediate: true,
    });
    this.editor.root = dom;
  }

  renderInReact(dom: HTMLElement): void {
    if (this.currentRenderType === EditorRenderType.Vue) {
      this.vueApp?.unmount();
      this.vueApp = undefined;
      Logger.log('unmount vue', dom);
    }
    ReactDom.render(createElement(EditorViewReact, {
      editor: this.editor,
    }), dom);
    this.currentRenderType = EditorRenderType.React;
  }

  renderInVue(dom: HTMLElement): void {
    if (this.currentRenderType === EditorRenderType.React) {
      ReactDom.unmountComponentAtNode(dom);
      Logger.log('unmount react', dom);
    }
    this.vueApp = createApp(EditorView, {
      editor: this.editor,
    });
    this.vueApp.mount(dom);
    this.currentRenderType = EditorRenderType.Vue;
  }
}
