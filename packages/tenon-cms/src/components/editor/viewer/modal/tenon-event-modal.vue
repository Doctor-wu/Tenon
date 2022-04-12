<template>
  <a-modal
    :footer="false"
    width="968px"
    v-model:visible="visible"
    @ok="handleOk"
    @before-close="handleBeforeClose"
  >
    <template #title>页面事件管理</template>
    <section class="modal-content-container">
      <section class="event-operate">
        <a-button @click="handleAddEvent" :disabled="addingEvent" type="primary">
          <icon-plus-circle />&nbsp;新建事件
        </a-button>
      </section>
      <section class="modal-content-wrapper">
        <ul class="event-list" v-if="eventList.length || addingEvent">
          <li class="event-item" :class="{ active: selectedEvent?._new }" v-if="addingEvent">
            <a-card
              @click="() => handleSelectEvent({ _new: true })"
              class="event-title-card"
              hoverable
            >
              <section class="event-item-wrapper">
                <b class="event-name">
                  <span style="color: red;">*</span> 新建事件
                </b>
                <a-button
                  @click.stop="() => handleDeleteEvent(-1)"
                  style="float: right;"
                  status="danger"
                  size="mini"
                  type="text"
                >取消</a-button>
              </section>
            </a-card>
          </li>
          <li
            class="event-item"
            :class="{ active: selectedEvent === item }"
            v-for="(item, index) in eventList"
          >
            <a-card @click="() => handleSelectEvent(item)" class="event-title-card" hoverable>
              <section class="event-item-wrapper">
                <b class="event-name">{{ item.eventName }}</b>
                <a-popconfirm
                  :content="`确认删除${item.eventName}事件吗?`"
                  @ok="() => handleDeleteEvent(index)"
                  position="right"
                >
                  <a-button
                    @click.stop="() => { }"
                    style="float: right;"
                    status="danger"
                    size="mini"
                    type="text"
                  >
                    <icon-delete></icon-delete>
                  </a-button>
                </a-popconfirm>
              </section>
            </a-card>
          </li>
        </ul>
        <section v-else class="empty-event">
          <a-empty>暂无事件</a-empty>
        </section>
        <main class="event-info">
          <section v-if="selectedEvent" class="event-info-wrapper">
            <TenonEventForm
              @on-update-event="onUpdatedEvent"
              @on-add-event="onAddedEvent"
              :event-info="selectedEvent"
            ></TenonEventForm>
          </section>
          <section v-else class="empty-event-info">
            <a-empty>未选中事件</a-empty>
          </section>
        </main>
      </section>
    </section>
  </a-modal>
</template>
<script setup lang="ts">
import { deleteTenonEventApi } from '@/api';
import { Message } from '@arco-design/web-vue';
import { ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import TenonEventForm from './tenon-event-form.vue';
const store = useStore();

const $emit = defineEmits([]);

const visible = ref(false);
const eventList = ref<any[]>([]);

const handleOk = () => {

};

const handleBeforeClose = () => {
  addingEvent.value = false;
  selectedEvent.value = null;
};

const open = () => {
  visible.value = true;
};

const close = () => {
  visible.value = false;
}

watchEffect(async () => {
  const pageInfo = await store.getters['page/getPageInfo'];

  eventList.value = pageInfo.events || [];
});

const addingEvent = ref(false);
function handleAddEvent() {
  addingEvent.value = true;
  handleSelectEvent({ _new: true });
}

function onAddedEvent() {
  addingEvent.value = false;
  selectedEvent.value = null;
  store.dispatch('page/updatePageEvent');
}

function onUpdatedEvent() {
  store.dispatch('page/updatePageEvent');
}

async function handleDeleteEvent(index) {
  if (index === -1) { // 新增事件
    addingEvent.value = false;

    if (selectedEvent.value?._new) {
      selectedEvent.value = null;
    }
  } else {
    const willBeDelete = eventList.value[index];
    const {
      success, errorMsg
    } = await deleteTenonEventApi(willBeDelete._id);
    if (!success) {
      return Message.error(errorMsg!);
    }
    store.dispatch('page/updatePageEvent');
    Message.success('删除成功');
    if (selectedEvent.value?._id === willBeDelete._id) {
      selectedEvent.value = null;
    }
  }
}

const selectedEvent = ref<{
  _id?: string;
  _new?: boolean;
  eventName?: string;
  content?: string;
  gather?: string;
} | null>(null);
function handleSelectEvent(eventInfo) {
  selectedEvent.value = eventInfo;
}

defineExpose({ open, close });
</script>
<style lang="scss" scoped>
.modal-content-container {
  height: 628px;
  display: flex;
  flex-direction: column;

  .event-title-card {
    cursor: pointer;
  }

  .event-operate {
    display: flex;
    padding-bottom: 12px;
    margin-top: -6px;
    box-sizing: border-box;
  }

  .modal-content-wrapper {
    display: flex;
    height: 590px;
    border: 1px solid #e3e3e3;
  }

  .event-item {
    transition: all ease 0.3s;
    margin-bottom: 12px;
  }

  .event-item.active {
    box-shadow: 0px 0 28px -8px #4c8cec;
  }

  .empty-event,
  .empty-event-info {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .empty-event-info {
    height: 100%;
  }

  .empty-event,
  .event-list {
    width: 240px;
    height: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 6px;
    border-right: 1px solid #e3e3e3;
    box-sizing: border-box;
    overflow: auto;
  }

  .event-info {
    flex: 1;
    height: 100%;
    box-sizing: border-box;
    padding: 6px;
  }

  .event-info-wrapper {
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
  }
}
</style>