import { Service } from "../decorators";
import { createServiceTag } from "./tag";


export const SurfaceService = createServiceTag('SurfaceService');

@Service({
  name: SurfaceService,
})
export class SurfaceServiceCore {
  private surfaceDom: HTMLElement;

  attach(dom: HTMLElement) {
    this.surfaceDom = dom;
  }

  getSurfaceDom() {
    return this.surfaceDom;
  }
}