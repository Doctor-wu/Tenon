import { IEditor, IConfig, IContext, IEventCenter } from "./interface";
import { TenonEditorEventCenter } from "./event-center";
import { IDynamicFeature, Loader, awaitLoad } from "@tenon/workbench";
import { BaseConfig } from "../../config/base";
import { TenonEditorAdapter } from "../workbench/tenon-loader";
import {
  ITenonEditorLifeCycle,
  TenonEditorLifeCycle,
  TenonEditorLifeCycleStage,
} from "./lifecycle";
import { TenonEditorContext } from "./context";
import { plugins } from "../workbench/plugins";
import { IDataEngine, TenonDataEngine } from "./model/data-engine";
import { TenonPerformanceMeasure } from '../performance/measure';
import { Logger } from "@/utils/logger";

export class TenonEditor {
  @Loader(ITenonEditorLifeCycle)
  lifecycleLoader: IDynamicFeature<TenonEditorLifeCycle>;

  get lifecycle() {
    return this.lifecycleLoader.instance;
  }

  eventCenter: TenonEditorEventCenter;
  workbenchAdaptor: TenonEditorAdapter;
  config: BaseConfig = window.AppConfig;
  root: HTMLElement;
  context: TenonEditorContext;
  dataEngine: TenonDataEngine;

  constructor() {
    this.setupAdaptor();
    this.setupInjection();
    this.initInstantiations();
    this.setupLifeCycle();
    window.editor = this;
  }

  private setupAdaptor() {
    this.workbenchAdaptor = new TenonEditorAdapter(this);
  }

  private async setupInjection() {
    this.context =
      (await this.workbenchAdaptor.workbenchDIService.get<TenonEditorContext>(
        IContext
      ))!;

    this.eventCenter =
      (await this.workbenchAdaptor.workbenchDIService.get<TenonEditorEventCenter>(
        IEventCenter
      ))!;
    this.dataEngine =
      (await this.workbenchAdaptor.workbenchDIService.get<TenonDataEngine>(
        IDataEngine
      ))!;
  }

  private setupPlugin() {
    this.workbenchAdaptor.registerPlugin(plugins);
  }

  @awaitLoad(ITenonEditorLifeCycle)
  private async setupLifeCycle() {
    this.lifecycle!.regisStageCallBack(
      TenonEditorLifeCycleStage.Init,
      async () => {
        this.logInfo();
        this.lifecycle!.emitStageFinish(TenonEditorLifeCycleStage.Init);
      }
    );
    this.lifecycle!.regisStageCallBack(
      TenonEditorLifeCycleStage.LaunchWorkbench,
      () => {
        this.launchWorkbench();
      }
    );
    this.lifecycle!.regisStageCallBack(
      TenonEditorLifeCycleStage.InitDataEngine,
      () => {
        this.lifecycle!.emitStageFinish(
          TenonEditorLifeCycleStage.InitDataEngine
        );
      }
    );
    this.lifecycle!.regisStageCallBack(
      TenonEditorLifeCycleStage.EditorAdapterReady,
      () => {
        this.initInstantiations();
        this.setupPlugin();
        this.lifecycle!.emitStageFinish(
          TenonEditorLifeCycleStage.EditorAdapterReady
        );
      }
    );
    this.lifecycle!.regisStageCallBack(
      TenonEditorLifeCycleStage.Ready,
      () => {
        Logger.info("Tenon Performance Measure:");
        TenonPerformanceMeasure.getInstance().measureMetrics();
        TenonPerformanceMeasure.getInstance().logMetrics();
      },
    );
  }

  @awaitLoad(ITenonEditorLifeCycle)
  private async initInstantiations() {
    this.registerService(IEditor, this);
    this.registerService(IConfig, this.config);
    [...this.workbenchAdaptor.workbenchDIService.instances.values()].forEach(instance => {
      if ('$onEditorOpen' in instance) {
        instance['$onEditorOpen'](this);
      }
    });
  }

  @awaitLoad(ITenonEditorLifeCycle)
  private launchWorkbench() {
    window.addEventListener("load", () => {
      const root = document.getElementById("workbench-root")!;
      this.workbenchAdaptor.load(root);
      this.lifecycle!.emitStageFinish(
        TenonEditorLifeCycleStage.LaunchWorkbench
      );
    });
  }

  private logInfo() {
    console.log("tenon editor init, editor: ", this);
  }

  public registerService = (serviceName: any, instance: any) => {
    this.workbenchAdaptor.workbenchDIService.services.set(serviceName, {
      name: serviceName,
      loader: () => { },
      instance,
    });
    this.workbenchAdaptor.workbenchDIService.instances.set(
      serviceName,
      instance
    );
  };

  @awaitLoad(ITenonEditorLifeCycle)
  public async run() {
    this.lifecycle!.run();
  }
}
