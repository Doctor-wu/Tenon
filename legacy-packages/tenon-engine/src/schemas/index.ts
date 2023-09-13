import { containerBackgroundSchema } from "./containerBackground";
import { containerSchema } from "./containerLayout";
import { textStyleSchema } from "./textStyle";
import { typoCommonSchema, typoEllipsisSchema } from "./typoCommon";


export const internalSchema = {
  containerLayout: containerSchema,
  containerBackground: containerBackgroundSchema,
  textStyle: textStyleSchema,
  typoCommon: typoCommonSchema,
  typoEllipsis: typoEllipsisSchema,
};