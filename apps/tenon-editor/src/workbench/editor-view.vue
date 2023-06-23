<template>
  <section class="editor-view-wrapper">
    <div id="tenon-editor" ref="editorView">
      <component
        v-if="runtimeTree"
        :is="
          runtimeTree.render({
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
import { RuntimeComponentTree } from "@/core/model";
import { ModelChange, ModelChangeNotification } from "@/core/model/notification";
import { onMounted, Ref, ref } from "vue";

const props = defineProps<{
  editor: TenonEditor;
}>();

const editorView = ref<HTMLElement>();
const runtimeTree = ref<RuntimeComponentTree | null>(props.editor.dataEngine.runtimeRoot) as Ref<RuntimeComponentTree | null>;

props.editor.context.on(ModelChange, async (noti: ModelChangeNotification) => {
  console.log("ModelChange", noti.payload);
  runtimeTree.value = noti.payload;
  // 根节点不可拖拽
  runtimeTree.value.draggable = false;
});

onMounted(async () => {
  console.log("editorView", editorView.value);
});
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
