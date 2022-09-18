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

export const headerBarConfig: HeaderBarConfig = [
  {
    name: 'title',
    type: IHeaderBarType.Info,
    render: () => h(Title, {
      text: 'Workbench主标题'
    }),
  },
  createDividerItem(IHeaderBarType.Info),
  {
    name: 'title',
    type: IHeaderBarType.Info,
    render: () => h(SubTitle, {
      text: 'Workbench副标题'
    }),
  },
  {
    name: 'github-icon',
    type: IHeaderBarType.Operator,
    popupText: 'Github',
    iconName: 'logo-github-filled'
  },
  {
    name: 'doc-icon',
    type: IHeaderBarType.Operator,
    popupText: '文档',
    iconName: 'root-list'
  },
  {
    name: 'more-icon',
    type: IHeaderBarType.Operator,
    popupText: '更多',
    iconName: 'view-list'
  },
  createDividerItem(IHeaderBarType.Operator),
  {
    name: 'avatar',
    type: IHeaderBarType.Operator,
    render: () => h(Avatar, {
      size: '40px',
      image: 'https://tdesign.gtimg.com/site/avatar.jpg',
      shape: 'round'
    })
  }
]