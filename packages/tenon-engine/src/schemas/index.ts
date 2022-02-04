import { containerBackgroundSchema } from "./containerBackground";
import { containerSchema } from "./containerLayout";
import { textStyleSchema } from "./textStyle";


export const internalSchema = {
  containerLayout: containerSchema,
  containerBackground: containerBackgroundSchema,
  textStyle: textStyleSchema,
};