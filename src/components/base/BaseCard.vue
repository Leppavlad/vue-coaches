<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  max-width: 40rem;
  margin: 2rem auto;
  padding: 1rem;
  border-radius: 12px;
}
</style>
