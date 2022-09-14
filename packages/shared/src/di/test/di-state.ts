import { DIState } from "../core";
import { createServiceDecorator } from "../decorators";

export const diState = new DIState();
export const Service = createServiceDecorator(diState);