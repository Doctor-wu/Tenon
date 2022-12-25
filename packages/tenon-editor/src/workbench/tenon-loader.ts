import { IWorkbenchAdapter, WorkbenchLoader, WorkbenchSettings } from "@tenon/workbench"
import "@tenon/workbench/lib/style.css";
import { footBarConfig } from "../configs/foot-bar-config";
import { headerBarConfig } from "../configs/header-bar-config";
import { toolBarConfig } from "../configs/tool-bar-config";
import { controllers, dynamicTags, syncFeatures } from "../features";

@WorkbenchSettings({
  dynamicTags: dynamicTags,
  syncFeatures: syncFeatures,
  controllers: controllers,
  footBarConfig: footBarConfig,
  headerBarConfig: headerBarConfig,
  keyBoardConfig: null,
  toolBarConfig: toolBarConfig,
})
export class TenonEditorAdapter extends WorkbenchLoader implements IWorkbenchAdapter {
  attachEditor(dom: HTMLElement): void {
    dom.innerHTML = 'editor';
  }
}
