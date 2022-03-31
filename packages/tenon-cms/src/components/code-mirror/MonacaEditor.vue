<template>
  <section ref="editorRef" class="editor-container"></section>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import { initLanguages } from './languages';
(self as any).MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker();
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker();
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker();
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

const props = defineProps<{
  modelValue?: string;
}>();

const $emit = defineEmits(['update:modelValue']);

const editorRef = ref();
let editor: monaco.editor.IStandaloneCodeEditor;
let cancelWatch = watch(props, () => {
  if (editor.getValue() !== props.modelValue) {
    editor.setValue(props.modelValue || '');
  }
});


initLanguages();
onMounted(() => {
  editor = monaco.editor.create(editorRef.value, {
    language: 'javascript',
    theme: 'vs-dark',
    value: props.modelValue,
    selectOnLineNumbers: true,//显示行号
    readOnly: false, // 只读
    cursorStyle: 'line', //光标样式
    automaticLayout: true, //自动布局
    fontSize: 15, //字体大小
    quickSuggestionsDelay: 100, //代码提示延时
  });

  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, function () {
    console.log('save');
  });

  editor.onDidChangeModelContent(() => {
    const text = editor?.getValue();

    $emit('update:modelValue', text);
  });
});

onBeforeUnmount(() => {
  editor.dispose();
  cancelWatch();
})

</script>

<style lang="scss" scoped>
.editor-container {
  height: 220px;
}
</style>