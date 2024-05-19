<script setup lang="ts"></script>

<template>
  <div class="col-12 col-md-4 mb-4">
    <div class="card">
      <div
        class="card-body d-flex flex-column justify-content-center align-items-center"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  cursor: pointer;
  transition: transform 0.2s;
  min-height: 250px;
}

.card:hover {
  transform: scale(1.05);
}
</style>
