import { ActionController } from "@tenon/workbench";

export class HeaderBarController {

  @ActionController('github-icon', 'onClick')
  handleGithubIconClick() {
    window.open('https://github.com/Doctor-wu/Tenon', '_blank');
  }
}