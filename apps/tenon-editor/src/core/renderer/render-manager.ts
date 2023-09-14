import { Service } from "@tenon/workbench";
import { IRendererManager } from "../interface";
import { IRenderer } from "@tenon/engine";


@Service({
  name: IRendererManager,
})
export class RendererManager {
  private rendererMap: Map<string, IRenderer> = new Map();

  registerRenderer(name: string, renderer: IRenderer) {
    this.rendererMap.set(name, renderer);
  }

  getRenderer(name: string) {
    if (!this.rendererMap.has(name)) throw new Error(`Renderer ${name} not found`);
    return this.rendererMap.get(name)!;
  }
}
