import { IWorkbenchAdapter, WorkbenchLoader, WorkbenchSettings } from "@tenon/workbench";
import { headerBarConfig } from "./configs/header-bar-config";
import { FeatureBHandler, FeatureCFeature, FeatureAHandler, HeaderBarHandler } from "./features";
import { HeaderBarsController } from "./features/headerbar/headerbar.controller";
import "@tenon/workbench/lib/style.css";
import "./index.css";
import { toolBarConfig } from "./configs/tool-bar-config";
import { footBarConfig } from "./configs/foot-bar-config";

const root = document.getElementById('app-root')!;

@WorkbenchSettings({
  dynamicTags: [
    FeatureCFeature,
  ],
  syncFeatures: [
    FeatureAHandler,
    FeatureBHandler,
    HeaderBarHandler,
  ],
  controllers: [
    HeaderBarsController,
  ],
  footBarConfig: footBarConfig,
  headerBarConfig: headerBarConfig,
  keyBoardConfig: null,
  toolBarConfig: toolBarConfig,
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