import {
  Controller,
  Loader,
  IDynamicFeature,
  ActionController,
  ActionType,
  awaitLoad,
} from "@tenon/workbench";
import { IGithubHrefFeature } from "./github-href.interface";
import { HeaderBarName } from "@/configs/header-bar-config";

@Controller({
  name: Symbol('github-href-controller')
})
export class GithubHrefController {
  @Loader(IGithubHrefFeature)
  githubHrefFeatureLoader: IDynamicFeature<IGithubHrefFeature>;

  get githubHref() {
    return this.githubHrefFeatureLoader.instance;
  }

  @ActionController(HeaderBarName.GithubIcon, ActionType.onClick)
  @awaitLoad(IGithubHrefFeature)
  async handleGithubIconClick() {
    this.githubHref!.locateToGithubInBlank();
  }
}
