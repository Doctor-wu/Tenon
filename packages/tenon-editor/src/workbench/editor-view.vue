<template>
  <section class="editor-view-wrapper">
    <div
      style="display: inline-block; margin-top: 20px"
      id="tenon-editor"
      ref="editorView"
    >
      <span ref="editorText">editor</span>
      <section ref="editorConfig">
        {{ JSON.stringify(editor.config) }}
      </section>
    </div>
  </section>
</template>
<script setup lang="ts">
import { IContext, TenonEditor, TenonEditorContext } from "@/core";
import { IAreaIndicatorFeature } from "@/features/area-indicator";
import { AreaMarkType } from "@/features/area-indicator/area-indicator.interface";
import { IEditModeFeature } from "@/features/edit-mode";
import {
  EditModeChange,
  ModeNotification,
  ModeType,
} from "@/features/edit-mode/notification";
import { onMounted, ref } from "vue";

const props = defineProps<{
  editor: TenonEditor;
}>();

const editorView = ref<HTMLElement>();
const editorText = ref<HTMLElement>();
const editorConfig = ref<HTMLElement>();
onMounted(async () => {
  console.log("editorView", editorView.value);
  const editor = props.editor;
  const di = editor.workbenchAdaptor.workbenchDIService;
  const areaIndicator = (await di.get<IAreaIndicatorFeature>(IAreaIndicatorFeature))!;
  const editMode = (await di.get<IEditModeFeature>(IEditModeFeature))!;
  const context = (await di.get<TenonEditorContext>(IContext))!;
  areaIndicator.markElement(editorText.value!, AreaMarkType.Active);
  areaIndicator.useSingletonHoverMark(editorText.value!);
  areaIndicator.useSingletonHoverMark(editorConfig.value!);
  let disposer: () => void;
  if (editMode?.mode.value === ModeType.Edit) {
    disposer = await areaIndicator.useSingletonHoverMark(editorView.value!);
  }
  context.on(EditModeChange, async (noti: ModeNotification) => {
    if (noti.mode === ModeType.Edit) {
      disposer = await areaIndicator?.useSingletonHoverMark(editorView.value!);
    } else {
      disposer?.();
    }
  });
});
</script>
<style lang="scss" scoped>
.editor-view-wrapper {
  padding: 6px;
}
</style>
