<template>
  <section class="card-options-container" :class="{ show: visible }">
    <section class="option-wrapper hover-open" @click="() => $emit('onOpen')">
      <icon-folder />
    </section>
    <div class="divider"></div>
    <section class="vertical-container">
      <section class="option-wrapper hover-edit" @click="() => $emit('onEdit')">
        <icon-edit />
      </section>
      <div class="horizon-divider"></div>
      <a-popconfirm
        content="确认要删除该项目吗?"
        @ok="() => $emit('onDelete')"
        position="bottom"
      >
        <section class="option-wrapper hover-delete">
          <icon-delete />
        </section>
      </a-popconfirm>
    </section>
  </section>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);

const $emit = defineEmits(['onOpen', 'onEdit', 'onDelete']);

const show = () => visible.value = true;
const hide = () => visible.value = false;

defineExpose({
  show,
  hide,
})

</script>
<style lang="scss" scoped>
.card-options-container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #00000099;
  color: #e3e3e3;
  cursor: pointer;
  transition: all ease 0.3s;
  opacity: 0;
  display: flex;

  &.show {
    opacity: 1;
  }

  .divider {
    width: 1px;
    background-color: #e3e3e3;
  }

  .horizon-divider {
    height: 1px;
    background-color: #e3e3e3;
  }

  .vertical-container {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .option-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all ease 0.3s;
    font-size: 24px;
    &:hover {
      filter: brightness(1.2);
      background-color: #12121233;
    }
    &.hover-open:hover {
      color: #4b88fb;
    }
    &.hover-edit:hover {
      color: #4bfb88;
    }
    &.hover-delete:hover {
      color: #fb4b3f;
    }
  }
}
</style>