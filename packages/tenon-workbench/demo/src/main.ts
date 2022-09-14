import { Workbench } from "@tenon/workbench";
import { FeatureBHandler, FeatureCFeature, FeatureAHandler } from "./features";

const root = document.getElementById('workbench-root')!;

const wb = new Workbench({
  el: root,
  adapter: null,
  dynamicTags: [
    FeatureCFeature,
  ],
  syncFeatures: [
    FeatureAHandler,
    FeatureBHandler,
  ],
  uiControllers: [],
  actionControllers: [],
  editorGrid: null,
  footBarConfig: null,
  headBarConfig: null,
  keyBoardConfig: null,
  toolBarConfig: null,
});

console.log(wb);