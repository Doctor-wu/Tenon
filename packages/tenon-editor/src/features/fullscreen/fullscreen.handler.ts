import {
  BarService,
  BarServiceCore,
  Feature, Inject,
} from "@tenon/workbench";
import { FullScreenType, IFullScreenFeature } from "./fullscreen.interface";
import { IEditor, TenonEditor } from "@/core/editor";
import { ExitFullScreenConfig, FullScreenConfig } from "./configs";
import { FootBarName } from "@/configs/foot-bar-config";
import { IContext, TenonEditorContext } from "@/core/context";
import { FullScreenNotification } from "./notification";

@Feature({
  name: IFullScreenFeature,
})
export class FullScreenHandler implements IFullScreenFeature {
  private fullScreen: boolean;
  private root: HTMLElement;

  constructor(
    @Inject(BarService) private barService: BarServiceCore,
    @Inject(IContext) private context: TenonEditorContext,
    @Inject(IEditor) editor: TenonEditor,
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
    this.onFullScreenChange(this.isFullScreen);
    return this.isFullScreen;
  }

  enableFullScreen() {
    return document.fullscreenEnabled;
  }

  private onFullScreenChange(fullscreen: boolean) {
    let result;
    if (fullscreen) {
      result = ExitFullScreenConfig;
    } else {
      result = FullScreenConfig;
    }
    this.barService.updateFootBarConfig(
      FootBarName.FullScreen,
      result,
    );
    this.fullScreen = fullscreen;
  }

  private initEvent() {
    window.onresize = () => {
      if (this.isFullScreen !== this.fullScreen) {
        this.context.fire(new FullScreenNotification(
          this.isFullScreen ? FullScreenType.FullScreen : FullScreenType.UnFullScreen,
        ));
      }
    };
    this.context.on(FullScreenType.FullScreen, () => {
      this.onFullScreenChange(true);
    });
    this.context.on(FullScreenType.UnFullScreen, () => {
      this.onFullScreenChange(false);
    });
  }
}
