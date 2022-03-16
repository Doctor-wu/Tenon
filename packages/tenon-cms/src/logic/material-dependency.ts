import DynamicComponent from "@/components/shared/dynamic-component.vue";
import Avatar from "@/dependency/Avatar.vue";
import Text from "@/dependency/Text.vue";
import Icon from "@/dependency/Icon.vue";
import {
  Image, Card, Grid, Button, Carousel,
  // Avatar
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
  IconQq,
  IconThunderbolt,
  IconWechat
} from '@arco-design/web-vue/es/icon';

export const materialDependency = {
  ArcoImage: Image,
  ArcoCard: Card,
  GridCol: Grid.Col,
  GridRow: Grid.Row,
  ArcoButton: Button,
  ArcoCarousel: Carousel,
  ArcoCarouselItem: Carousel.Item,
  TenonText: Text,
  TenonAvatar: Avatar,
  TenonIcon: Icon,
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
};