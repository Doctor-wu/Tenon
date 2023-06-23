import {
  DrawerDisplayType,
  Feature, IDynamicFeature,
  Inject, Loader, awaitLoad,
} from "@tenon/workbench";
import {
  AreaMarkStyleMap, AreaMarkType,
  IAreaIndicatorFeature, SingleMarkType,
} from "./area-indicator.interface";
import { ISurfaceOperateFeature } from "../surface-operate";
import { IContext, LeftDrawerNotificationType, RightDrawerNotificationType, TenonEditor, TenonEditorContext } from "@/core";
import { CommonNotificationType } from "@/core/notifications/common-notification";
import { FullScreenType } from "../fullscreen/fullscreen.interface";

export const MARK_PADDING = 1;

@Feature({
  name: IAreaIndicatorFeature,
})
export class AreaIndicatorHandler implements IAreaIndicatorFeature {

  @Loader(ISurfaceOperateFeature)
  private surfaceOperate: IDynamicFeature<ISurfaceOperateFeature>;
  private editor: TenonEditor | undefined;

  private get ISurfaceOperateFeature(): ISurfaceOperateFeature {
    return this.surfaceOperate.instance!;
  }

  private visible = true;
  private singletonHoverMarkDisposerMap: Map<SingleMarkType, {
    element: HTMLElement;
    disposer: () => void;
  }> = new Map();

  constructor(
    @Inject(IContext) private context: TenonEditorContext,
  ) { }

  $onEditorOpen(editor: TenonEditor) {
    this.initEvent(editor);
  }

  private initEvent(editor: TenonEditor) {
    this.editor = editor;
    this.context.on(DrawerDisplayType.Float, this.update.bind(this));
    this.context.on(DrawerDisplayType.Flow, this.update.bind(this));
    this.context.on(CommonNotificationType.WINDOW_RESIZE, () => {
      setTimeout(() => {
        this.update();
      }, 0);
    });
    const hideThenUpdate = () => {
      this.changeVisible(false);
      setTimeout(() => {
        this.update();
        this.changeVisible(true);
      }, 300);
    }
    this.context.on(FullScreenType.FullScreen, hideThenUpdate);
    this.context.on(FullScreenType.UnFullScreen, hideThenUpdate);
    this.context.on(LeftDrawerNotificationType.CLOSE_LEFT_DRAWER, hideThenUpdate);
    this.context.on(LeftDrawerNotificationType.OPEN_LEFT_DRAWER, hideThenUpdate);
    this.context.on(RightDrawerNotificationType.CLOSE_RIGHT_DRAWER, hideThenUpdate);
    this.context.on(RightDrawerNotificationType.OPEN_RIGHT_DRAWER, hideThenUpdate);
  }

  async useHoverMark(element: HTMLElement) {
    const abortController = new AbortController();
    element.addEventListener('mouseenter', async () => {
      const dispose = await this.markElement(element, AreaMarkType.DragHover);
      element.addEventListener('mouseleave', () => {
        dispose();
      }, { once: true });
    }, { signal: abortController.signal });
    return abortController;
  }

  async useSingletonMark(
    type: SingleMarkType,
    element: HTMLElement,
  ) {
    if (this.singletonHoverMarkDisposerMap.get(type)) {
      this.singletonHoverMarkDisposerMap.get(type)!.disposer();
      this.singletonHoverMarkDisposerMap.delete(type);
    }
    const closureDispose = await this.markElement(element, AreaMarkType[type]);
    this.singletonHoverMarkDisposerMap.set(type, {
      element,
      disposer: closureDispose,
    });
    return () => {
      closureDispose?.();
      this.singletonHoverMarkDisposerMap.delete(type);
    };
  }

  async useSingletonHoverMark(
    type: SingleMarkType.DragHover | SingleMarkType.DropHovering,
    element: HTMLElement,
    shouldHide?: () => boolean,
  ) {
    if (this.singletonHoverMarkDisposerMap.get(type)) {
      this.singletonHoverMarkDisposerMap.get(type)!.disposer();
      this.singletonHoverMarkDisposerMap.delete(type);
    }
    let closureDispose;
    const abortController = new AbortController();
    element.addEventListener('mouseover', async (e) => {
      if (shouldHide?.()) return;
      if (e.currentTarget !== element) return;
      if (this.singletonHoverMarkDisposerMap.get(type)) {
        this.singletonHoverMarkDisposerMap.get(type)!.disposer();
      }
      closureDispose = await this.markElement(element, AreaMarkType[type]);
      this.singletonHoverMarkDisposerMap.set(type, {
        element,
        disposer: closureDispose,
      });
      element.addEventListener('mouseleave', (e) => {
        if (e.currentTarget !== element) return;
        closureDispose();
      }, { signal: abortController.signal });
    }, {
      signal: abortController.signal,
      capture: true,
    });
    return () => {
      closureDispose?.();
      abortController.abort();
    };
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
      subtree: true,
      childList: true,
      characterData: true,
    });
    (dom as any).__tenon_indicator_update__ = updater;
    dom.style.visibility = this.visible ? 'visible' : 'hidden';
    return () => {
      ob.disconnect();
      (dom as any).__tenon_indicator_update__ = undefined;
      this.ISurfaceOperateFeature.removeDom(dom.id);
    }
  }

  @awaitLoad(ISurfaceOperateFeature)
  public async getElementRectRelativeWithSurface(element: HTMLElement) {
    const surfaceDom = this.surfaceOperate.instance!.getSurfaceDom();
    const rect = element.getBoundingClientRect();
    let accY = element.offsetTop - (this.editor?.root.scrollTop || 0);
    let accX = element.offsetLeft - (this.editor?.root.scrollLeft || 0);
    let width = rect.width;
    let height = rect.height;
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

  @awaitLoad(ISurfaceOperateFeature)
  public async update() {
    const doms = this.ISurfaceOperateFeature.getDoms();
    doms.forEach(dom => {
      (dom as any).__tenon_indicator_update__?.();
    });
  }

  @awaitLoad(ISurfaceOperateFeature)
  public async changeVisible(visible: boolean) {
    this.visible = visible;
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
