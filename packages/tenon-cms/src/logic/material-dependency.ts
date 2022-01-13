import { Image, Card, Grid, Button, Carousel, Avatar } from "@arco-design/web-vue";
import { IconAlignCenter } from "@arco-design/web-vue/es/icon";
import DynamicComponent from "../components/dynamic-component.vue";

export const materialDependency = {
  ArcoImage: Image,
  ArcoCard: Card,
  GridCol: Grid.Col,
  GridRow: Grid.Row,
  ArcoButton: Button,
  ArcoCarousel: Carousel,
  ArcoCarouselItem: Carousel.Item,
  ArcoAvatar: Avatar,
  DynamicComponent: DynamicComponent,
}