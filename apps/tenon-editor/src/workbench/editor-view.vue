<template>
  <section class="editor-view-wrapper">
    <div id="tenon-editor" ref="editorView">
      <component v-if="runtimeTree" :is="editor.context.rendererManager
        .getRenderer(runtimeTree.name)
        .render(RendererHost.Vue, runtimeTree, {
          style: {
            minHeight: '680px',
          },
        }, {
          materialEditable: editor.store.getValue(StoreKey.EditMode).value === EditModeType.Edit
        })"></component>
    </div>
  </section>
</template>
<script setup lang="ts">
import { TenonEditor } from "@/core";
import { ModelChange, ModelChangeNotification } from "@/core";
import { EditModeType } from "@/features/edit-mode/edit-mode.interface";
import { StoreKey } from "@/store";
import { ModelImpl, ModelHost, RendererHost } from "@tenon/engine";
import { ref, shallowRef } from "vue";

const props = defineProps<{
  editor: TenonEditor;
}>();

const editorView = ref<HTMLElement>();
const runtimeTree = shallowRef<ModelImpl[ModelHost] | null>(
  props.editor.context.dataEngine.root
);

props.editor.context.on(
  ModelChange,
  async (noti: ModelChangeNotification<ModelImpl[ModelHost]>) => {
    console.log("ModelChange", noti.payload);
    if (noti.payload.id === runtimeTree.value?.id) {
      return;
    }
    runtimeTree.value = noti.payload;
    // 根节点不可拖拽
    runtimeTree.value.draggable = false;
    // 根节点不可选中
    runtimeTree.value.selectable = false;
  }
);
</script>
<style lang="scss" scoped>
@import url("./style/editor-style.scss");
</style>
