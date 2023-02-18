import { BarService, BarServiceCore, Feature, Inject } from "@tenon/workbench";
import { FullScreenType, IFullScreenFeature } from "./fullscreen.interface";
import { TenonEditor } from "@/core/editor";
import { ExitFullScreenConfig, FullScreenConfig } from "./configs";
import { FootBarName } from "@/configs/foot-bar-config";
import { TenonEditorContext } from "@/core/context";
import { FullScreenNotification } from "./notification";
import { FullScreen } from "./reactive";
import { fromEvent, takeWhile } from "rxjs";
import { IContext, IEditor } from "@/core/interface";

@Feature({
  name: IFullScreenFeature,
})
export class FullScreenHandler implements IFullScreenFeature {
  private fullScreen = FullScreen;
  private root: HTMLElement;

  constructor(
    @Inject(BarService) private barService: BarServiceCore,
    @Inject(IContext) private context: TenonEditorContext,
    @Inject(IEditor) editor: TenonEditor
  ) {
    this.root = editor.root;
    this.initEvent();
  }

  get isFullScreen() {
    return !!(
      document.fullscreen ||
      // @ts-ignore
      document.mozFullScreen ||
      // @ts-ignore
      document.webkitIsFullScreen ||
      // @ts-ignore
      document.webkitFullScreen ||
      // @ts-ignore
      document.msFullScreen
    );
  }

  async toggleFullScreen() {
    if (this.isFullScreen) {
      await document.exitFullscreen();
    } else {
      await document.body.requestFullscreen();
    }
    return this.isFullScreen;
  }

  enableFullScreen() {
    return document.fullscreenEnabled;
  }

  private onFullScreenChange(fullscreen: boolean) {
    this.fullScreen.value = fullscreen;
  }

  private initEvent() {
    fromEvent(window, "resize").subscribe(() => {
      if (this.isFullScreen === this.fullScreen.value) return;
      console.log(this.isFullScreen, this.fullScreen.value);
      console.log("fire FullScreenNotification");
      this.context.fire(
        new FullScreenNotification(
          this.isFullScreen
            ? FullScreenType.FullScreen
            : FullScreenType.UnFullScreen
        )
      );
    });
    this.context.on(FullScreenType.FullScreen, () => {
      this.onFullScreenChange(true);
    });
    this.context.on(FullScreenType.UnFullScreen, () => {
      this.onFullScreenChange(false);
    });
  }
}
