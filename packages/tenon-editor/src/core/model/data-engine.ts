import { IComposeViewFeature } from '@/features/compose-view';
import { TenonEventManager } from './event-manager';
import { RuntimeComponentTree } from '../../features/runtime-component-tree/runtime-component-tree';
import { IDynamicFeature, Inject, Loader, Service, awaitLoad, createServiceTag } from "@tenon/workbench";
import { IContext } from '../interface';
import { TenonEditorContext } from '../context';
import { ModelChangeNotification } from './notification';
import { BaseMaterial, IDryMaterial } from '@tenon/materials';
import { IMaterialFeature } from '@/features/material';
import { IRuntimeComponentTreeFeature } from '@/features/runtime-component-tree';

export const IDataEngine = createServiceTag('TenonDataEngine');

@Service({
  name: IDataEngine,
})
export class TenonDataEngine {
  runtimeRoot: RuntimeComponentTree;
  eventManager: TenonEventManager;

  @Loader(IComposeViewFeature)
  private composeViewFeature: IDynamicFeature<IComposeViewFeature>;

  private get composeView() {
    return this.composeViewFeature.instance!;
  }

  @Loader(IRuntimeComponentTreeFeature)
  private runtimeComponentTree: IDynamicFeature<IRuntimeComponentTreeFeature>;

  private get runtimeTree() {
    return this.runtimeComponentTree.instance!;
  }

  constructor(
    @Inject(IContext) private context: TenonEditorContext,
  ) {
    console.log('TenonDataEngine init');
    this.initData();
  }

  @awaitLoad(IComposeViewFeature, IRuntimeComponentTreeFeature)
  private async initData() {
    const composeView = this.composeView.getComposeView();
    this.runtimeRoot = await this.runtimeTree.buildRuntimeTree(composeView);
    this.context.fire(
      new ModelChangeNotification(this.runtimeRoot),
    );
    console.log('TenonDataEngine initData', this.runtimeRoot);
  }
}
