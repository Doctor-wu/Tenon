<template>
  <section class="editor-view-wrapper">
    <div
      style="display: inline-block; margin-top: 20px"
      id="tenon-editor"
      ref="editorView"
    >
      editor
      <section>
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
onMounted(async () => {
  console.log("editorView", editorView.value);
  const editor = props.editor;
  const di = editor.workbenchAdaptor.workbenchDIService;
  const areaIndicator = (await di.get<IAreaIndicatorFeature>(IAreaIndicatorFeature))!;
  const editMode = (await di.get<IEditModeFeature>(IEditModeFeature))!;
  const context = (await di.get<TenonEditorContext>(IContext))!;
  areaIndicator.markElement(editorView.value!, AreaMarkType.Active);
  let signal: AbortController;
  if (editMode?.mode.value === ModeType.Edit) {
    signal = await areaIndicator.useHoverMark(editorView.value!);
  }
  context.on(EditModeChange, async (noti: ModeNotification) => {
    if (noti.mode === ModeType.Edit) {
      signal = await areaIndicator?.useHoverMark(editorView.value!);
    } else {
      signal.abort();
    }
  });
});
</script>
<style lang="scss" scoped>
.editor-view-wrapper {
  padding: 6px;
}
</style>
