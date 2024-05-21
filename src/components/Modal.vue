<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  title: string;
  openBtnText: string;
  openBtnStyle?: string;
  actionBtnText: string;
  actionBtnStyle?: string;
  submitFunc: any;
}>();

const isOpened = ref(false);

const closeModal = () => {
  isOpened.value = false;
};

const openModal = () => {
  isOpened.value = true;
};

const handleSubmit = () => {
  props.submitFunc();
  closeModal();
};
</script>

<template>
  <div v-if="isOpened" class="modal fade show" tabindex="-1" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="closeModal"
          ></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            Close
          </button>
          <button
            @click="handleSubmit"
            type="button"
            :class="actionBtnStyle ? actionBtnStyle : 'btn btn-primary'"
          >
            {{ actionBtnText }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <button
    type="button"
    @click="openModal"
    :class="openBtnStyle ? openBtnStyle : 'btn btn-primary'"
  >
    {{ openBtnText }}
  </button>
</template>

<style scoped>
.modal {
  display: block;
}
</style>
