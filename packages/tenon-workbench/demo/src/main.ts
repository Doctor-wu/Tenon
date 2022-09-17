import { WorkbenchLoader, WorkbenchSettings } from "@tenon/workbench";
import { FeatureBHandler, FeatureCFeature, FeatureAHandler } from "./features";

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
  actionControllers: [],
  footBarConfig: null,
  headBarConfig: null,
  keyBoardConfig: null,
  toolBarConfig: null,
})
class App extends WorkbenchLoader {
}

const app = new App();
app.load(root);