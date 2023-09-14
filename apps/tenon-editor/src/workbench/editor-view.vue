<template>
  <section class="editor-view-wrapper">
    <div id="tenon-editor" ref="editorView">
      <component
        v-if="runtimeTree"
        :is="
          editor.context.rendererManager
            .getRenderer(runtimeTree.name)
            .render(runtimeTree, {
              style: {
                minHeight: '680px',
              },
            })
        "
      ></component>
    </div>
  </section>
</template>
<script setup lang="ts">
import { TenonEditor } from "@/core";
import { ModelChange, ModelChangeNotification } from "@/core";
import { ModelImpl, ModelType } from "@tenon/engine";
import { Ref, ref } from "vue";

const props = defineProps<{
  editor: TenonEditor;
}>();

const editorView = ref<HTMLElement>();
const runtimeTree = ref<ModelImpl[ModelType.Tree] | null>(
  props.editor.context.dataEngine.runtimeRoot
) as Ref<ModelImpl[ModelType.Tree] | null>;

props.editor.context.on(
  ModelChange,
  async (noti: ModelChangeNotification<ModelImpl[ModelType.Tree]>) => {
    console.log("ModelChange", noti.payload);
    if (noti.payload.id === runtimeTree.value?.id) {
      return;
    }
    runtimeTree.value = noti.payload;
    // 根节点不可拖拽
    runtimeTree.value.draggable = false;
  }
);
</script>
<style lang="scss" scoped>
.editor-view-wrapper {
  padding: 6px;
  height: 100%;
  box-sizing: border-box;
}

#tenon-editor {
  display: inline-block;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 320px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}
</style>
