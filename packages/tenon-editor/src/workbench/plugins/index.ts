import { ToolBarName } from "@/configs/tool-bar-config";
import { ExcludeSwitch } from "./exclude-switch";

export const plugins = [
  new ExcludeSwitch([
    ToolBarName.MaterialSwitch,
    ToolBarName.ComponentTreeSwitch,
  ]),
  // Add your plugin here
];
