import { HeaderBarConfig, HeaderBarType } from "@tenon/workbench";
import Title from "../components/title.vue";
import SubTitle from "../components/sub-title.vue";
import { h } from "vue";
import { Avatar, Button, Divider, Icon } from "tdesign-vue-next";

export const createDividerItem = <BarType extends HeaderBarType>(
  type: BarType | undefined,
  layoutType: 'vertical' | 'horizontal' = 'vertical',
  options = {}
) => ({
  name: 'title',
  render: () => h(Divider, {
    layout: layoutType,
    ...options,
  }),
  ...(type ? { type } : {}),
}) as any;

export enum HeaderBarName {
  Home = 'Home',
  Title = 'title',
  SubTitle = 'sub-title',
  GithubIcon = 'github-icon',
  DocIcon = 'doc-icon',
  MoreIcon = 'more-icon',
  Avatar = 'Avatar',
};

export enum MoreItemName {
  More = 'More',
}

export const headerBarConfig: HeaderBarConfig = {
  config: [
    {
      name: HeaderBarName.Home,
      type: HeaderBarType.Info,
      render: () => h(Button, {
        variant: 'text',
        style: {
          width: '30px',
          height: '30px',
          cursor: 'unset'
        }
      }, {
        default: () => h(Icon, {
          name: 'home',
          size: '24px',
        }),
      }),
    },
    createDividerItem(HeaderBarType.Info),
    {
      name: HeaderBarName.Title,
      type: HeaderBarType.Info,
      render: () => h(Title, {
        text: 'Workbench主标题',
      }),
    },
    {
      name: HeaderBarName.SubTitle,
      type: HeaderBarType.Info,
      render: () => h(SubTitle, {
        text: 'Workbench副标题',
        style: {
          alignSelf: 'flex-end',
        }
      }),
    },
    {
      name: HeaderBarName.GithubIcon,
      type: HeaderBarType.Operator,
      popupText: 'Github',
      icon: {
        iconName: 'logo-github-filled',
      },
      style: {
        marginRight: '8px'
      },
    },
    {
      name: HeaderBarName.DocIcon,
      type: HeaderBarType.Operator,
      popupText: '文档',
      icon: {
        iconName: 'root-list',
      },
      style: {
        marginRight: '8px'
      },
    },
    {
      name: HeaderBarName.MoreIcon,
      type: HeaderBarType.Operator,
      popupText: '更多',
      icon: {
        iconName: 'view-list',
      },
      listTree: [
        {
          name: MoreItemName.More,
          text: '更多',
          children: [
            {
              name: MoreItemName.More,
              text: '更多',
            },
            createDividerItem(undefined, 'horizontal', {
              style: {
                margin: '3px 0'
              }
            }),
            {
              name: MoreItemName.More,
              text: '更多内容',
            },
            {
              name: MoreItemName.More,
              text: '更多更多内容',
            },
          ]
        },
        createDividerItem(undefined, 'horizontal', {
          style: {
            margin: '3px 0'
          }
        }),
        {
          name: MoreItemName.More,
          text: '更多内容',
        },
        {
          name: MoreItemName.More,
          text: '更多更多内容',
        },
      ],
    },
    createDividerItem(HeaderBarType.Operator),
    {
      name: HeaderBarName.Avatar,
      type: HeaderBarType.Operator,
      render: () => h(Avatar, {
        size: '35px',
        image: 'https://tdesign.gtimg.com/site/avatar.jpg',
        shape: 'round'
      })
    }
  ],
}