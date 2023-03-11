<template>
  <div style="display: inline-block; margin-top: 20px" id="tenon-editor">
    editor
    <section>
      {{ JSON.stringify(editor.config) }}
    </section>
  </div>
</template>
<script setup lang="ts">
import { TenonEditor } from "@/core";

const props = defineProps<{
  editor: TenonEditor;
}>();
</script>
<style lang="scss" scoped></style>
