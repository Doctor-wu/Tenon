<template>
  <template v-if="loaded">
    <template v-for="(project, index) in projects">
      <section
        class="project-item-wrapper"
        @mouseenter="() => cardOptions?.[index].show()"
        @mouseleave="() => cardOptions?.[index].hide()"
        :loading="true"
      >
        <a-avatar :size="150" shape="square" class="project-item">
          <span style="font-weight: 300;">
            &nbsp;&nbsp;&nbsp;
            {{ project.projectName }}
            &nbsp;&nbsp;&nbsp;
          </span>
        </a-avatar>
        <ProjectCardOptions
          :ref="(el) => cardOptions[index] = el"
          @on-open="() => $router.push({ path: `/page-list/${project._id}` })"
          @on-delete="() => deleteProject(project._id)"
        ></ProjectCardOptions>
      </section>
    </template>
    <section @click="openAddProjectModal" class="add-project project-item-wrapper">
      <icon-plus class="add-icon" />
    </section>
  </template>
  <section class="loading-container" v-else>
    <a-spin dot></a-spin>
  </section>
  <AddProjectModal @add="onAdd" ref="modal"></AddProjectModal>
</template>

<script setup lang="ts">
import { deleteProjectApi, getProjectsApi } from '@/api/project';
import { onBeforeMount, reactive, ref } from 'vue';
import AddProjectModal from '@/components/project-list/add-project-modal.vue';
import { getRandomColor } from '@tenon/shared';
import ProjectCardOptions from '../components/project-list/project-card-options.vue';
import { Message } from '@arco-design/web-vue';

const projects = ref<any>([]);
const cardOptions = ref<any[]>([]);
const loaded = ref(false);

const fetchProjects = async () => {
  loaded.value = false;
  return await getProjectsApi().then(({ data }) => {
    projects.value = data;
    loaded.value = true;
  });
};

onBeforeMount(() => {
  fetchProjects();
});

const deleteProject = async (projectId) => {
  const { success, data, errorMsg } = await deleteProjectApi({ projectId });
  if (success) {
    Message.success(data);
    fetchProjects();
  } else {
    Message.error(errorMsg!);
  }
}

const modal = ref();
const openAddProjectModal = () => {
  modal.value.open();
};

const onAdd = () => {
  fetchProjects();
}


</script>

<style lang="scss" scoped>
$size: 150px;

.project-item {
  cursor: pointer;
}
$size: 150px;

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
  border-radius: 8px;
  display: flex;
  flex-direction: colum;
  margin-top: 20px;
  float: left;
  position: relative;
  perspective: 200px;
  overflow: hidden;
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