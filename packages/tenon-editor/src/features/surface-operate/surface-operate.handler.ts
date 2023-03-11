import {
  Feature, Inject, SurfaceService, SurfaceServiceCore
} from "@tenon/workbench";
import { ISurfaceOperateFeature } from "./surface-operate.interface";

@Feature({
  name: ISurfaceOperateFeature,
})
export class SurfaceOperateHandler implements ISurfaceOperateFeature {
  private surfaceDom: HTMLElement;
  private doms: Map<string, HTMLElement> = new Map();

  constructor(
    @Inject(SurfaceService) private surface: SurfaceServiceCore,
  ) {
    this.surfaceDom = this.surface.getSurfaceDom();
  }

  public drawRect(
    x: number,
    y: number,
    width: number,
    height: number,
    border?: string,
  ) {
    const id = Math.random().toString(16).substr(2);
    const dom = this.createDom(id, border);
    this.setDom(dom, x, y, width, height);
    this.surfaceDom.appendChild(dom);
    return {
      id, dom,
    };
  }

  public createDom(id: string, border = '1px solid #000') {
    const dom = document.createElement('div');
    dom.className = `tenon-area-indicator-${id}`;
    dom.id = id;
    dom.style.position = 'absolute';
    dom.style.border = border;
    dom.style.zIndex = '999';
    dom.style.pointerEvents = 'none';
    dom.style.boxSizing = 'border-box';
    this.doms.set(id, dom);
    return dom;
  }

  public getDom(id: string) {
    return this.doms.get(id);
  }

  public setDom(dom: HTMLDivElement, x: number, y: number, width: number, height: number) {
    dom.style.left = `${x}px`;
    dom.style.top = `${y}px`;
    dom.style.width = `${width}px`;
    dom.style.height = `${height}px`;
  }

  public removeDom(id: string) {
    const dom = this.doms.get(id);
    if (dom) {
      this.surfaceDom.removeChild(dom);
      this.doms.delete(id);
    }
  }

  public clearDom() {
    [...this.doms.keys()].forEach((id) => {
      this.removeDom(id);
    });
    this.doms.clear();
  }

  public getSurfaceDom() {
    return this.surfaceDom;
  }
}
