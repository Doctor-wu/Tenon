<template>
  <template v-if="loaded">
    <template v-for="(page, index) in pages">
      <section
        class="project-item-wrapper"
        @mouseenter="() => cardOptions?.[index].show()"
        @mouseleave="() => cardOptions?.[index].hide()"
      >
        <a-avatar :size="150" shape="square" class="project-item">
          <span style="font-weight: 300;">
            &nbsp;&nbsp;&nbsp;
            {{ page.pageName }}
            &nbsp;&nbsp;&nbsp;
          </span>
        </a-avatar>
        <PageCardOptions
          :ref="(el) => cardOptions[index] = el"
          @on-open="() => $router.push(`/edit/${page._id}`)"
          @on-delete="() => deletePage(page._id)"
        ></PageCardOptions>
      </section>
    </template>
    <section @click="openAddProjectModal" class="add-project project-item-wrapper">
      <icon-plus class="add-icon" />
    </section>
  </template>
  <section class="loading-container" v-else>
    <a-spin dot></a-spin>
  </section>
  <AddPageModal @add="onAdd" ref="modal"></AddPageModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { deletePageApi, getPagesApi } from '@/api/page';
import { useRouter } from 'vue-router';
import AddPageModal from '@/components/page-list/add-page-modal.vue';
import PageCardOptions from '@/components/page-list/page-card-options.vue';
import { Message } from '@arco-design/web-vue';
import { getProjectInfoApi } from '@/api';
import { useStore } from 'vuex';

const pages = ref<any>([]);
const cardOptions = ref<any[]>([]);
const loaded = ref(false);
const projectId = useRouter().currentRoute.value.params['projectId'];
const store = useStore();

const fetchPages = async () => {
  loaded.value = false;
  return await getPagesApi(projectId).then(({ data }) => {
    pages.value = data;
    loaded.value = true;
  });
};

fetchPages();
store.getters['project/getProjectInfo'].then((data) => {
  const { _id } = data || {};
  if (_id !== projectId) {
    console.log('update');

    getProjectInfoApi(projectId)
      .then(({ data }) => {
        store.dispatch('project/setProjectInfo', data);
        console.log(data);
      });
  }
});

const deletePage = async (pageId) => {
  const { success, data, errorMsg } = await deletePageApi({ pageId });
  if (success) {
    Message.success(data);
    fetchPages();
  } else {
    Message.error(errorMsg!);
  }
}

const modal = ref();
const openAddProjectModal = () => {
  modal.value.open();
};

const onAdd = () => {
  fetchPages();
}

</script>

<style lang="scss" scoped>
$size: 150px;

.project-item-wrapper {
  display: flex;
  flex-direction: colum;
  margin-top: 20px;
  float: left;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.project-item {
  cursor: pointer;
  background-color: #fff;
  color: #3387f2;
  border: 1px dotted currentColor;
  transition: all ease 0.3s;
  border-radius: 8px;
}
.project-item-wrapper {
  margin-left: 40px;
}
.add-project {
  cursor: pointer;
  height: $size;
  width: $size;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed currentColor;
  border-radius: 8px;
  color: gray;
  transition: color 0.3s ease;

  &:hover {
    color: #3387f2;
  }

  .add-icon {
    font-size: 36px;
    stroke-width: 2;
  }
}
.loading-container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
</style>