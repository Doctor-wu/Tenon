import { ComponentTreeNode, executeQueueEvents } from "@tenon/engine";
import { onBeforeUnmount, onMounted } from "vue";

export function setupComponentEvents(tenonComp: ComponentTreeNode) {
  if (tenonComp.events.onMounted) {
    const eventStruct = tenonComp.events["onMounted"];
    onMounted(() => {
      executeQueueEvents(eventStruct.executeQueue);
    });
  }
  if (tenonComp.events.onBeforeUnmount) {
    const eventStruct = tenonComp.events["onBeforeUnmount"];
    onBeforeUnmount(() => {
      executeQueueEvents(eventStruct.executeQueue);
    });
  }
}