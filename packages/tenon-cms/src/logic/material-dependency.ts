import DynamicComponent from "@/components/shared/dynamic-component.vue";
import { Image, Card, Grid, Button, Carousel, Avatar } from "@arco-design/web-vue";

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