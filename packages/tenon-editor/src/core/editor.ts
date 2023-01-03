import { IDynamicFeature, Loader, awaitLoad, createSyncFeatureTag } from "@tenon/workbench";
import { BaseConfig } from "../../config/base";
import { TenonEditorAdapter } from "../workbench/tenon-loader";
import { ILifeCycle, TenonEditorLifeCycle, TenonEditorLifeCycleStage } from "./lifecycle";
import { IContext, TenonEditorContext } from "./context";

export const IEditor = createSyncFeatureTag('tenon-editor');
export const IConfig = createSyncFeatureTag('tenon-editor-config');

export class TenonEditor {
  @Loader(ILifeCycle)
  lifecycleLoader: IDynamicFeature<TenonEditorLifeCycle>;

  get lifecycle() {
    return this.lifecycleLoader.instance;
  }

  workbenchAdaptor: TenonEditorAdapter;
  config: BaseConfig = window.AppConfig;
  root: HTMLElement;
  context: TenonEditorContext;

  constructor() {
    this.setupAdaptor();
    this.setupContext();
    this.initInstantiations()
    this.setupLifeCycle();
    window.editor = this;
  }

  private setupAdaptor() {
    this.workbenchAdaptor = new TenonEditorAdapter(this);
  }

  private async setupContext() {
    this.context = (await this.workbenchAdaptor.workbenchDIService.get<TenonEditorContext>(IContext))!;
  }

  @awaitLoad(ILifeCycle)
  private async setupLifeCycle() {
    this.lifecycle!.regisStageCallBack(
      TenonEditorLifeCycleStage.Init,
      async () => {
        this.logInfo();
        this.lifecycle!.emitStageFinish(
          TenonEditorLifeCycleStage.Init,
        );
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
        this.lifecycle!.emitStageFinish(
          TenonEditorLifeCycleStage.EditorAdapterReady,
        );
      }
    )
  }

  @awaitLoad(ILifeCycle)
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

  @awaitLoad(ILifeCycle)
  private launchWorkbench() {
    window.addEventListener('load', () => {
      const root = document.getElementById('workbench-root')!;
      this.root = root;
      this.workbenchAdaptor.load(root);
      this.lifecycle!.emitStageFinish(
        TenonEditorLifeCycleStage.LaunchWorkbench
      );
    });
  }

  private logInfo() {
    console.log('tenon editor init, editor: ', this);
  }

  public registerService = (
    serviceName: any,
    instance: any,
  ) => {
    this.workbenchAdaptor.workbenchDIService.services.set(serviceName, {
      name: serviceName,
      loader: () => { },
      instance,
    });
    this.workbenchAdaptor.workbenchDIService.instances.set(serviceName, instance);
  }

  @awaitLoad(ILifeCycle)
  public async run() {
    this.lifecycle!.run();
  }
}
