import { ToolBarName } from "@/configs/tool-bar-config";
import { ExcludeSwitchPlugin } from "./exclude-switch";

export const plugins = [
  new ExcludeSwitchPlugin([
    ToolBarName.MaterialSwitch,
    ToolBarName.ComponentTreeSwitch,
  ]),
  // Add your plugin here
];
