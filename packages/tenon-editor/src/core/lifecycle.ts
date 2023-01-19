import {
  EventEmitterCore, EventEmitterService,
  IDynamicFeature, Loader, Service, awaitLoad, createSyncFeatureTag,
} from '@tenon/workbench';

export enum TenonEditorLifeCycleStage {
  Init,
  LaunchWorkbench,
  EditorAdapterReady,
  Ready,
}

export const ITenonEditorLifeCycle = createSyncFeatureTag('tenon-editor-lifecycle');

@Service({
  name: ITenonEditorLifeCycle,
})
export class TenonEditorLifeCycle {
  private stage: TenonEditorLifeCycleStage = TenonEditorLifeCycleStage.Init;
  private stageIndex: number = 0;
  private stageRegistry = new Map<TenonEditorLifeCycleStage, Set<any>>();
  private stageList = [
    TenonEditorLifeCycleStage.Init,
    TenonEditorLifeCycleStage.LaunchWorkbench,
    TenonEditorLifeCycleStage.EditorAdapterReady,
    TenonEditorLifeCycleStage.Ready,
  ];

  @Loader(EventEmitterService)
  eventEmitterLoader: IDynamicFeature<EventEmitterCore>;

  get eventEmitter() {
    return this.eventEmitterLoader.instance;
  }

  constructor() {
    this.setupRegistry();
  }

  private setupRegistry() {
    for (const stage of this.stageList) {
      this.stageRegistry.set(stage, new Set);
    }
  }

  private nextStage() {
    if (this.stageIndex === this.stageList.length - 1) return;
    this.stage = this.stageList[++this.stageIndex];
    this.invokeStageCallback(this.stage);
  }

  private invokeStageCallback(stage: TenonEditorLifeCycleStage) {
    const registry = this.stageRegistry.get(stage)!;
    [...registry].forEach(async fn => await fn());
  }

  private checkStage(stage: TenonEditorLifeCycleStage) {
    if (this.stage > stage) throw new TenonEditorLifecycleError(
      `stage cannot fall back, current stage: ${this.stage}, checkStage: ${stage}`,
    );
  }

  /**
   * 需要调用该方法来结束一段生命周期从而进入下一段生命周期
   * @param stage 生命周期阶段
   */
  @awaitLoad(EventEmitterService)
  public emitStageFinish(stage: TenonEditorLifeCycleStage) {
    this.checkStage(stage);
    this.eventEmitter!.emit(`${stage} finish`);
    this.nextStage();
  }

  public async run() {
    try {
      this.invokeStageCallback(
        TenonEditorLifeCycleStage.Init,
      );
    } catch (e) {
      throw new TenonEditorLifecycleError(e);
    }
  }

  @awaitLoad(EventEmitterService)
  public onStageFinish(stage: TenonEditorLifeCycleStage, fn: Function) {
    if (this.stage > stage) {
      fn();
    } else {
      this.eventEmitter!.on(
        `${stage} finish`,
        fn,
      );
    }
  }

  public regisStageCallBack(stage: TenonEditorLifeCycleStage, fn: Function) {
    this.stageRegistry.get(stage)!.add(fn);
  }
}

class TenonEditorLifecycleError extends Error {
  constructor(msg) {
    super(`[LifeCycle Error] ${msg}`);
  }
}
