import { ref } from 'vue';

export const editMode = ref(true);

export const toggleEditMode = (mode?: boolean) => {
  if (mode !== undefined) editMode.value = !!mode;
  else editMode.value = !editMode.value;
}