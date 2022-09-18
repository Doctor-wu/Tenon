import { IWorkbenchAdapter, WorkbenchLoader, WorkbenchSettings } from "@tenon/workbench";
import { headerBarConfig } from "./configs/header-bar-config";
import { FeatureBHandler, FeatureCFeature, FeatureAHandler } from "./features";
import { HeaderBarController } from "./features/headerbar/headerbar.controller";
import "./index.css";

const root = document.getElementById('workbench-root')!;

@WorkbenchSettings({
  dynamicTags: [
    FeatureCFeature,
  ],
  syncFeatures: [
    FeatureAHandler,
    FeatureBHandler,
  ],
  uiControllers: [],
  actionControllers: [
    HeaderBarController,
  ],
  footBarConfig: null,
  headerBarConfig: headerBarConfig,
  keyBoardConfig: null,
  toolBarConfig: null,
})
class App extends WorkbenchLoader implements IWorkbenchAdapter{
  attachEditor(dom: HTMLElement) {
    dom.innerHTML = 'editor';
  }
}

const app = new App();
console.log(app);
// app.barConfig.regisAction('github-icon', 'onClick', () => {
//   window.open('https://github.com/torns/Tenon', '_blank');
// });
app.load(root);