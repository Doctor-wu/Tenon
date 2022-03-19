<template>
  <section class="viewer-container" draggable="false">
    <section class="viewer-nav">
      <ViewerNav></ViewerNav>
    </section>
    <section class="viewer-panel" :class="[editMode ? 'editMode' : '']" ref="panel">
      <template v-if="store?.getters['viewer/getTree']">
        <ComposeView :tenonComp="store.getters['viewer/getTree']" class="rootView"></ComposeView>
      </template>
    </section>
    <section class="viewer-notice">
      <ViewerNotice></ViewerNotice>
    </section>
  </section>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeMount, onBeforeUnmount, computed, watchEffect } from 'vue';
import { useStore } from 'vuex';
import ViewerNav from '@/components/editor/viewer/viewer-nav/viewer-nav.vue';
import ComposeView from '~components/editor/viewer/Compose-View/Compose-View.vue';
import ViewerNotice from '~components/editor/viewer/viewer-notice.vue';
import { editMode } from '~logic/viewer-status';
import { setupMaterials } from '@/logic/setup-materials';
import { useRouter } from 'vue-router';
import { getPageInfoApi } from '@/api'
import { Message } from '@arco-design/web-vue';
import { config2tree, setID } from '@tenon/engine';


const store = useStore();
const panel = ref<HTMLElement>();
const router = useRouter();
const pageInfo = ref();
const {
  projectId, pageId,
} = router.currentRoute.value.params;
const editorWidth = ref('320px');
const editorHeight = ref('100%');
const editorZoom = computed(() => {
  return store.getters['viewer/scale'];
});



watchEffect(async () => {
  const width = (await store.getters['project/getProjectInfo'])?.userConfig.screenWidth;
  editorWidth.value = (width || 320) + 'px';
  editorHeight.value = 100 + '%';
});


onBeforeMount(() => {
  if (!store.getters['viewer/getTree']) {
    setupMaterials(store);
  }
  getPageInfoApi(pageId)
    .then(({ data, success, errorMsg }) => {
      if (!success) {
        Message.error(errorMsg!);
      }
      else {
        const config = data.tree;
        if (data.tree) {
          store.dispatch(
            'viewer/setTree',
            config2tree(
              { materialsMap: store.getters['materials/getMaterialsMap'] }
            )(config),
          );
        }
        store.dispatch('page/setPageInfo', data);
        setID(data.newestId);
        pageInfo.value = data;
        console.log(pageInfo.value);
      }
    });
});

onBeforeUnmount(() => {
  store.dispatch('viewer/clearTree');
});


</script>
<style lang="scss" scoped>
.rootView {
  height: 100%;
  // 劫持编辑器继承样式
  text-align: left;
  flex: 1;
}
.viewer-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  text-align: center;
}

.viewer-panel {
  box-shadow: 0 3px 18px 8px #00000010;
  zoom: v-bind(editorZoom);
  width: v-bind(editorWidth);
  // height: v-bind(editorHeight);
  min-height: 670px;
  // overflow: auto;
  margin: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: auto;
  &.editMode {
    // transform: scale(0.7);
    padding: 5px;
  }
}
.viewer-nav {
  height: 60px;
  border-bottom: 1px solid #e8e8e8;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  padding-bottom: 3px;
  background-color: #fff;
}

.viewer-notice {
  position: fixed;
  z-index: 1;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  border-top: 1px solid #e8e8e8;
  height: 40px;
}
</style>