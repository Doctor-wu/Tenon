import DynamicComponent from "./dynamic-component.vue";
import Root from "./Root.vue";
import Avatar from "./Avatar.vue";
import Text from "./Text.vue";
import Icon from "./Icon.vue";
import Table from "./Table.vue";
import {
  Image,
  Card,
  Grid,
  Button,
  Carousel,
  Menu,
} from "@arco-design/web-vue";
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconCaretDown,
  IconCaretLeft,
  IconCaretRight,
  IconCaretUp,
  IconGithub,
  IconQq,
  IconThunderbolt,
  IconWechat,
  IconWechatpay
} from '@arco-design/web-vue/es/icon';

export const materialDependency = {
  ArcoImage: Image,
  ArcoCard: Card,
  GridCol: Grid.Col,
  GridRow: Grid.Row,
  ArcoButton: Button,
  ArcoCarousel: Carousel,
  ArcoCarouselItem: Carousel.Item,
  ArcoMenu: Menu,
  ArcoSubMenu: Menu.SubMenu,
  ArcoMenuItem: Menu.Item,
  TenonRoot: Root,
  TenonText: Text,
  TenonAvatar: Avatar,
  TenonIcon: Icon,
  TenonTable: Table,
  DynamicComponent: DynamicComponent,
}

export const IconTypes = {
  thunder: IconThunderbolt,
  arrowDown: IconArrowDown,
  arrowLeft: IconArrowLeft,
  arrowRight: IconArrowRight,
  arrowUp: IconArrowUp,
  caretDown: IconCaretDown,
  caretUp: IconCaretUp,
  caretLeft: IconCaretLeft,
  caretRight: IconCaretRight,
  wechat: IconWechat,
  qq: IconQq,
  github: IconGithub,
  wechatPay: IconWechatpay,
};