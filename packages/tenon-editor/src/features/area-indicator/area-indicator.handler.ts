import {
  Feature, IDynamicFeature, Inject, Loader, SurfaceService, SurfaceServiceCore, awaitLoad
} from "@tenon/workbench";
import { AreaMarkStyleMap, AreaMarkType, IAreaIndicatorFeature } from "./area-indicator.interface";
import { ISurfaceOperateFeature } from "../surface-operate";
import { IContext, TenonEditor, TenonEditorContext } from "@/core";

export const MARK_PADDING = 3;

@Feature({
  name: IAreaIndicatorFeature,
})
export class AreaIndicatorHandler implements IAreaIndicatorFeature {

  @Loader(ISurfaceOperateFeature)
  private surfaceOperate: IDynamicFeature<ISurfaceOperateFeature>;

  get [ISurfaceOperateFeature]() {
    return this.surfaceOperate.instance;
  }

  constructor(
    @Inject(IContext) context: TenonEditorContext
  ) { }

  $onEditorOpen(editor: TenonEditor) {
    this.initEvent(editor);
  }

  private initEvent(editor: TenonEditor) {
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
    } = this[ISurfaceOperateFeature]!.drawRect(
      left - MARK_PADDING,
      top - MARK_PADDING,
      width + 2 * MARK_PADDING,
      height + 2 * MARK_PADDING,
      AreaMarkStyleMap[type],
    );
    const ob = new MutationObserver(async () => {
      console.log('style changed');
      const { left, top, width, height } = await this.getElementRectRelativeWithSurface(element);
      this[ISurfaceOperateFeature]!.setDom(
        dom,
        left - MARK_PADDING,
        top - MARK_PADDING,
        width + 2 * MARK_PADDING,
        height + 2 * MARK_PADDING,
      );
    });
    ob.observe(element, {
      attributeFilter: ['style'],
    });
    return () => {
      ob.disconnect();
      this[ISurfaceOperateFeature]!.removeDom(dom.id);
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
}
