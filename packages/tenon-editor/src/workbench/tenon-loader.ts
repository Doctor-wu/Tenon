import { IWorkbenchAdapter, WorkbenchLoader, WorkbenchSettings, WorkbenchType } from "@tenon/workbench"
import "@tenon/workbench/lib/style.css";
import { footBarConfig } from "../configs/foot-bar-config";
import { headerBarConfig } from "../configs/header-bar-config";
import { toolBarConfig } from "../configs/tool-bar-config";
import { controllers, dynamicTags, syncFeatures } from "../features";
import { TenonEditor } from "@/core/editor";

@WorkbenchSettings({
  dynamicTags: dynamicTags,
  syncFeatures: syncFeatures,
  controllers: controllers,
  footBarConfig: footBarConfig,
  headerBarConfig: headerBarConfig,
  toolBarConfig: toolBarConfig,
})
export class TenonEditorAdapter extends WorkbenchLoader implements IWorkbenchAdapter {

  constructor(
    public editor: TenonEditor,
  ) {
    super();
  }

  attachEditor(dom: HTMLElement): void {
    dom.innerHTML = 'editor';
  }
}
