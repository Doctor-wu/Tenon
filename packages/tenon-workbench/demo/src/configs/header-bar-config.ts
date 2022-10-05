import { HeaderBarConfig, IHeaderBarType } from "@tenon/workbench";
import Title from "../components/title.vue";
import SubTitle from "../components/sub-title.vue";
import { h } from "vue";
import { Avatar, Divider } from "tdesign-vue-next";

const createDividerItem = <BarType extends IHeaderBarType>(type: BarType) => ({
  name: 'title',
  type,
  render: () => h(Divider, {
    layout: 'vertical',
  }),
});

export enum HeaderBarName {
  Title = 'title',
  SubTitle = 'sub-title',
  GithubIcon = 'github-icon',
  DocIcon = 'doc-icon',
  MoreIcon = 'more-icon',
  Avatar = 'Avatar',
}

export const headerBarConfig: HeaderBarConfig = [
  {
    name: HeaderBarName.Title,
    type: IHeaderBarType.Info,
    render: () => h(Title, {
      text: 'Workbench主标题'
    }),
  },
  createDividerItem(IHeaderBarType.Info),
  {
    name: HeaderBarName.SubTitle,
    type: IHeaderBarType.Info,
    render: () => h(SubTitle, {
      text: 'Workbench副标题'
    }),
  },
  {
    name: HeaderBarName.GithubIcon,
    type: IHeaderBarType.Operator,
    popupText: 'Github',
    iconName: 'logo-github-filled'
  },
  {
    name: HeaderBarName.DocIcon,
    type: IHeaderBarType.Operator,
    popupText: '文档',
    iconName: 'root-list'
  },
  {
    name: HeaderBarName.MoreIcon,
    type: IHeaderBarType.Operator,
    popupText: '更多',
    iconName: 'view-list'
  },
  createDividerItem(IHeaderBarType.Operator),
  {
    name: HeaderBarName.Avatar,
    type: IHeaderBarType.Operator,
    render: () => h(Avatar, {
      size: '40px',
      image: 'https://tdesign.gtimg.com/site/avatar.jpg',
      shape: 'round'
    })
  }
]