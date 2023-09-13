import { Feature, Inject } from "@tenon/workbench";
import { FullScreenType, IFullScreenFeature } from "./fullscreen.interface";
import { TenonEditor } from "@/core/editor";
import { TenonEditorContext } from "@/core/context";
import { FullScreenNotification } from "./notification";
import { FullScreen } from "./reactive";
import { IContext, IEditor } from "@/core/interface";
import { CommonNotificationType } from "@/core/notifications/common-notification";
import { Logger } from "@/utils/logger";

@Feature({
  name: IFullScreenFeature,
})
export class FullScreenHandler implements IFullScreenFeature {
  private fullScreen = FullScreen;
  private root: HTMLElement;

  constructor(
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
    this.context.on(
      CommonNotificationType.WINDOW_RESIZE,
      () => {
        if (this.isFullScreen === this.fullScreen.value) return;
        Logger.log(this.isFullScreen, this.fullScreen.value);
        Logger.log("fire FullScreenNotification");
        this.context.fire(
          new FullScreenNotification(
            this.isFullScreen
              ? FullScreenType.FullScreen
              : FullScreenType.UnFullScreen
          )
        );
      }
    )
    this.context.on(FullScreenType.FullScreen, () => {
      this.onFullScreenChange(true);
    });
    this.context.on(FullScreenType.UnFullScreen, () => {
      this.onFullScreenChange(false);
    });
  }
}
