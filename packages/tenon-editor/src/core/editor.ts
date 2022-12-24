import { Subscribe } from "@tenon/shared";
import { createSyncFeatureTag } from "@tenon/workbench";
import { BaseConfig } from "../../config/base";
import { TenonEditorAdapter } from "../workbench/tenon-loader";
import { TenonEditorLifeCycle, TenonEditorLifeCycleStage } from "./lifecycle";

export const IEditor = createSyncFeatureTag('tenon-editor');
export const IConfig = createSyncFeatureTag('tenon-editor-config');

export class TenonEditor {
  eventEmitter = new Subscribe();
  lifecycle: TenonEditorLifeCycle = new TenonEditorLifeCycle();
  adaptor: TenonEditorAdapter;
  config: BaseConfig = window.AppConfig;

  constructor() {
    this.setupLifeCycle();
  }

  private setupLifeCycle() {
    this.lifecycle.regisStageCallBack(
      TenonEditorLifeCycleStage.Init,
      () => {
        this.logInfo();
        this.lifecycle.emitStageFinish(
          TenonEditorLifeCycleStage.Init,
        );
      }
    );
    this.lifecycle.regisStageCallBack(
      TenonEditorLifeCycleStage.LaunchWorkbench,
      () => {
        this.launchWorkbench();
      }
    );
    this.lifecycle.regisStageCallBack(
      TenonEditorLifeCycleStage.EditorAdapterReady,
      () => {
        this.initInstantiations();
        this.lifecycle.emitStageFinish(
          TenonEditorLifeCycleStage.EditorAdapterReady,
        );
      }
    )
  }

  private initInstantiations = () => {
    this.registerService(IEditor, () => this);
    this.registerService(IConfig, () => this.config);
  }

  private launchWorkbench() {
    window.addEventListener('load', () => {
      const root = document.getElementById('workbench-root')!;
      this.adaptor = new TenonEditorAdapter();
      this.adaptor.load(root);
      this.lifecycle.emitStageFinish(
        TenonEditorLifeCycleStage.LaunchWorkbench
      );
    });
  }

  private logInfo() {
    console.log('tenon editor init, editor: ', this);
  }

  public registerService: typeof this.adaptor.workbenchDIService.regisService = <T>(
    serviceName: any,
    loader: () => T,
    onLoad?: (instance: T) => void,
  ) => {
    this.adaptor.workbenchDIService.regisService(
      serviceName,
      loader,
      onLoad,
    );
  }

  public run() {
    this.lifecycle.run();
  }
}
