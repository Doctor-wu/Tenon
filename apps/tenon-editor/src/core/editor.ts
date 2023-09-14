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
import { PerformanceMetricsName, TenonPerformanceMeasure } from '../performance/measure';
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

  constructor() {
    this.setupAdaptor();
    this.setupInjection();
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
        performance.mark(PerformanceMetricsName.EditorInitd);
        this.launchWorkbench();
      }
    );
    this.lifecycle!.regisStageCallBack(
      TenonEditorLifeCycleStage.InitDataEngine,
      () => {
        performance.mark(PerformanceMetricsName.WorkbenchLaunched);
        this.lifecycle!.emitStageFinish(
          TenonEditorLifeCycleStage.InitDataEngine
        );
      }
    );
    this.lifecycle!.regisStageCallBack(
      TenonEditorLifeCycleStage.EditorAdapterReady,
      () => {
        performance.mark(PerformanceMetricsName.DataEngineInitd);
        this.initInstantiations();
        this.setupPlugin();
        this.lifecycle!.emitStageFinish(
          TenonEditorLifeCycleStage.EditorAdapterReady
        );
      }
    );
    this.lifecycle!.regisStageCallBack(
      TenonEditorLifeCycleStage.Ready,
      async () => {
        performance.mark(PerformanceMetricsName.AdapterReady);
        Logger.info("Tenon Editor Ready!");
        Logger.info("Tenon Performance Measure:");
        performance.mark(PerformanceMetricsName.EditorReady);
        await TenonPerformanceMeasure.getInstance().measureMetrics();
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
    window.addEventListener("DOMContentLoaded", () => {
      const root = document.getElementById("workbench-root")!;
      this.workbenchAdaptor.load(root);
      this.lifecycle!.emitStageFinish(
        TenonEditorLifeCycleStage.LaunchWorkbench
      );
    });
  }

  private logInfo() {
    Logger.log("tenon editor init, editor: ", this);
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
