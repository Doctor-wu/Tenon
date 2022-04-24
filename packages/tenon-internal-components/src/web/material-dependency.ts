import DynamicComponent from "./dynamic-component.vue";
import Root from "./Root.vue";
import Avatar from "./Avatar.vue";
import Text from "./Text.vue";
import Icon from "./Icon.vue";
import Table from "./Table.vue";
import For from "./For.vue";

import {
  Image,
  Card,
  Grid,
  Button,
  Carousel,
  Menu,
  Alert,
  Step,
  Steps,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  Form,
  Input,
  InputNumber,
  InputTag,
  Radio,
  RadioGroup,
  Rate,
  Select,
  Switch,
  Textarea,
  TimePicker,
  Tag,
  Space,
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
  IconCheckCircle,
  IconCloseCircle,
  IconDelete,
  IconDoubleDown,
  IconDoubleLeft,
  IconDoubleRight,
  IconDoubleUp,
  IconDown,
  IconGithub,
  IconLeft,
  IconQq,
  IconRight,
  IconThunderbolt,
  IconUp,
  IconWechat,
  IconWechatpay,
  IconExclamationCircle,
  IconPlusCircle,
  IconMinusCircle,
  IconQuestionCircle,
  IconStop,
  IconHeartFill,
  IconStarFill,
  IconThumbDownFill,
  IconThumbUpFill,
  IconAt,
  IconCloudDownload,
  IconCodeBlock,
  IconCodeSquare,
  IconCode,
  IconDownload,
  IconExport,
  IconHome,
  IconImport,
  IconList,
  IconMore,
  IconPoweroff,
  IconRefresh,
  IconReply,
  IconSearch,
} from '@arco-design/web-vue/es/icon';

export const materialDependency: any = {
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
  ArcoAlert: Alert,
  ArcoStep: Steps,
  ArcoStepItem: Step,
  ArcoCheckbox: Checkbox,
  ArcoCheckboxGroup: CheckboxGroup,
  ArcoDatePicker: DatePicker,
  ArcoForm: Form,
  ArcoFormItem: Form.Item,
  ArcoInput: Input,
  ArcoInputNumber: InputNumber,
  ArcoInputTag: InputTag,
  ArcoRadio: Radio,
  ArcoRadioGroup: RadioGroup,
  ArcoRate: Rate,
  ArcoSelect: Select,
  ArcoSwitch: Switch,
  ArcoTextarea: Textarea,
  ArcoTimePicker: TimePicker,
  ArcoTag: Tag,
  ArcoSpace: Space,
  TenonTemplate: Root,
  TenonText: Text,
  TenonAvatar: Avatar,
  TenonIcon: Icon,
  TenonTable: Table,
  TenonFor: For,
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
  delete: IconDelete,
  down: IconDown,
  up: IconUp,
  left: IconLeft,
  right: IconRight,
  doubleDown: IconDoubleDown,
  doubleUp: IconDoubleUp,
  doubleLeft: IconDoubleLeft,
  doubleRight: IconDoubleRight,
  checkCircle: IconCheckCircle,
  closeCircle: IconCloseCircle,
  exclCircle: IconExclamationCircle,
  plusCircle: IconPlusCircle,
  minusCircle: IconMinusCircle,
  quizCircle: IconQuestionCircle,
  stop: IconStop,
  heartFill: IconHeartFill,
  starFill: IconStarFill,
  thumbDown: IconThumbDownFill,
  thumbUp: IconThumbUpFill,
  at: IconAt,
  cloudDown: IconCloudDownload,
  codeBlock: IconCodeBlock,
  codeSquare: IconCodeSquare,
  code: IconCode,
  download: IconDownload,
  export: IconExport,
  import: IconImport,
  home: IconHome,
  list: IconList,
  more: IconMore,
  poweroff: IconPoweroff,
  refresh: IconRefresh,
  reply: IconReply,
  search: IconSearch,
};