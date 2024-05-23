<script setup lang="ts">
defineProps<{
  isEditing: boolean;
  logData: any;
}>();
</script>

<template>
  <form>
    <div class="mb-3">
      <label for="type" class="form-label">Type of Maintenance</label>
      <input
        type="text"
        class="form-control"
        id="type"
        v-model="logData.type"
        required
      />
    </div>
    <div class="mb-3">
      <label for="date" class="form-label">Date</label>
      <input
        type="date"
        class="form-control"
        id="date"
        v-model="logData.date"
        required
      />
    </div>
    <div class="mb-3">
      <label for="mileage" class="form-label">Vehicle Mileage</label>
      <input
        type="number"
        class="form-control"
        id="mileage"
        v-model="logData.mileage"
      />
    </div>
    <div class="mb-3">
      <label for="notes" class="form-label">Notes</label>
      <textarea
        class="form-control"
        id="notes"
        v-model="logData.notes"
      ></textarea>
    </div>
  </form>
</template>
