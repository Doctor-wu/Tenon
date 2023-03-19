import { IWorkbenchAdapter, WorkbenchLoader, WorkbenchSettings } from "@tenon/workbench"
import "@tenon/workbench/lib/style.css";
import { footBarConfig } from "@/configs/foot-bar-config";
import { headerBarConfig } from "@/configs/header-bar-config";
import { toolBarConfig } from "@/configs/tool-bar-config";
import { controllers, dynamicTags, syncFeatures } from "@/features";
import { TenonEditor } from "@/core/editor";
import { App, createApp, h } from "vue";
import EditorView from "./editor-view.vue";

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
    const editorVM = createApp(EditorView, {
      editor: this.editor,
    });
    editorVM.mount(dom);
    this.editorVM = editorVM;
    this.editor.root = dom;
  }
}
