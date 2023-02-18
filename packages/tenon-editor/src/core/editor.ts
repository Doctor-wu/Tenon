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
      TenonEditorLifeCycleStage.EditorAdapterReady,
      () => {
        this.initInstantiations();
        this.setupPlugin();
        this.lifecycle!.emitStageFinish(
          TenonEditorLifeCycleStage.EditorAdapterReady
        );
      }
    );
  }

  @awaitLoad(ITenonEditorLifeCycle)
  private async initInstantiations() {
    this.registerService(IEditor, this);
    this.registerService(IConfig, this.config);
    // this.workbenchAdaptor.workbenchDIService.regisService(IContext, )
    // [...this.adaptor.workbenchDIService.instances.values()].forEach(instance => {
    //   if ('$onEditorOpen' in instance) {
    //     instance['$onEditorOpen'](this);
    //   }
    // });
  }

  @awaitLoad(ITenonEditorLifeCycle)
  private launchWorkbench() {
    window.addEventListener("load", () => {
      const root = document.getElementById("workbench-root")!;
      this.root = root;
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
      loader: () => {},
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
