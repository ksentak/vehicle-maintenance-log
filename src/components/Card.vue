<script setup lang="ts">
defineProps({
  title: String,
});
</script>

<template>
  <div class="card">
    <div class="card-body justify-content-center">
      <h5 class="card-title text-center">
        {{ title }}
      </h5>
    </div>
  </div>
</template>

<style scoped>
.card {
  cursor: pointer;
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
}
</style>
