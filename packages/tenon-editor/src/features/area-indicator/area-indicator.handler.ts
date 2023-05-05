import {
  DrawerDisplayType,
  DrawerService,
  DrawerServiceCore,
  Feature, IDynamicFeature, Inject, Loader, awaitLoad
} from "@tenon/workbench";
import { AreaMarkStyleMap, AreaMarkType, IAreaIndicatorFeature } from "./area-indicator.interface";
import { ISurfaceOperateFeature } from "../surface-operate";
import { IContext, LeftDrawerNotificationType, RightDrawerNotificationType, TenonEditor, TenonEditorContext } from "@/core";

export const MARK_PADDING = 3;

@Feature({
  name: IAreaIndicatorFeature,
})
export class AreaIndicatorHandler implements IAreaIndicatorFeature {

  @Loader(ISurfaceOperateFeature)
  private surfaceOperate: IDynamicFeature<ISurfaceOperateFeature>;

  private get ISurfaceOperateFeature(): ISurfaceOperateFeature {
    return this.surfaceOperate.instance!;
  }

  constructor(
    @Inject(IContext) private context: TenonEditorContext,
  ) { }

  $onEditorOpen(editor: TenonEditor) {
    this.initEvent(editor);
  }

  private initEvent(editor: TenonEditor) {
    this.context.on(DrawerDisplayType.Float, this.update.bind(this));
    this.context.on(DrawerDisplayType.Flow, this.update.bind(this));
    const hideThenUpdate = () => {
      this.changeVisible(false);
      setTimeout(() => {
        this.update();
        this.changeVisible(true);
      }, 300);
    }
    this.context.on(LeftDrawerNotificationType.CLOSE_LEFT_DRAWER, hideThenUpdate);
    this.context.on(LeftDrawerNotificationType.OPEN_LEFT_DRAWER, hideThenUpdate);
    this.context.on(RightDrawerNotificationType.CLOSE_RIGHT_DRAWER, hideThenUpdate);
    this.context.on(RightDrawerNotificationType.OPEN_RIGHT_DRAWER, hideThenUpdate);
  }

  async useHoverMark(element: HTMLElement) {
    const abortController = new AbortController();
    element.addEventListener('mouseover', async () => {
      const dispose = await this.markElement(element, AreaMarkType.Hover);
      element.addEventListener('mouseleave', () => {
        dispose();
      }, { once: true });
    }, { signal: abortController.signal });
    return abortController;
  }

  @awaitLoad(ISurfaceOperateFeature)
  async markElement(element: HTMLElement, type: AreaMarkType) {
    const { left, top, width, height } = await this.getElementRectRelativeWithSurface(element);
    const {
      dom,
    } = this.ISurfaceOperateFeature.drawRect(
      left - MARK_PADDING,
      top - MARK_PADDING,
      width + 2 * MARK_PADDING,
      height + 2 * MARK_PADDING,
      AreaMarkStyleMap[type],
    );
    const updater = async () => {
      console.log('attribute changed');
      const { left, top, width, height } = await this.getElementRectRelativeWithSurface(element);
      this.ISurfaceOperateFeature.setDom(
        dom,
        left - MARK_PADDING,
        top - MARK_PADDING,
        width + 2 * MARK_PADDING,
        height + 2 * MARK_PADDING,
      );
    };
    const ob = new MutationObserver(updater);
    ob.observe(element, {
      attributes: true,
    });
    (dom as any).__tenon_indicator_update__ = updater;
    return () => {
      ob.disconnect();
      this.ISurfaceOperateFeature.removeDom(dom.id);
    }
  }

  @awaitLoad(ISurfaceOperateFeature)
  public async getElementRectRelativeWithSurface(element: HTMLElement) {
    const surfaceDom = this.surfaceOperate.instance!.getSurfaceDom();
    let accY = element.offsetTop;
    let accX = element.offsetLeft;
    let width = element.clientWidth;
    let height = element.clientHeight;
    let current = element;
    while ([...current.children].includes(surfaceDom) && current.parentElement) {
      accY += current.offsetTop;
      accX += current.offsetLeft;
      current = current.parentElement!;
    }
    return {
      left: accX,
      top: accY,
      width,
      height,
    };
  }

  public update() {
    const doms = this.ISurfaceOperateFeature.getDoms();
    doms.forEach(dom => {
      (dom as any).__tenon_indicator_update__?.();
    });
  }

  public changeVisible(visible: boolean) {
    const doms = this.ISurfaceOperateFeature.getDoms();
    doms.forEach(dom => {
      if (visible) {
        dom.style.visibility = 'visible';
      } else {
        dom.style.visibility = 'hidden';
      }
    });
  }
}
