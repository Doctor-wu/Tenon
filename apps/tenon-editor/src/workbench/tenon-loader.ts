import { IWorkbenchAdapter, WorkbenchLoader, WorkbenchSettings } from "@tenon/workbench"
import "@tenon/workbench/lib/style.css";
import { footBarConfig } from "@/configs/foot-bar-config";
import { headerBarConfig } from "@/configs/header-bar-config";
import { toolBarConfig } from "@/configs/tool-bar-config";
import { controllers, dynamicTags, syncFeatures } from "@/features";
import { TenonEditor } from "@/core/editor";
import { App, createApp } from "vue";
import ReactDom from "react-dom";
import EditorView from "./editor-view.vue";
import { EditorViewReact } from "./editor-view.react";
import { createElement } from "react";

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
  public editorVM: App<Element>;

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
    // const editorVM = createApp(EditorView, {
    //   editor: this.editor,
    // });
    // editorVM.mount(dom);
    ReactDom.render(createElement(EditorViewReact, {
      editor: this.editor,
    }), dom);
    // this.editorVM = editorVM;
    this.editor.root = dom;
  }
}
