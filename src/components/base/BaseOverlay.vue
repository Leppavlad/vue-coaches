<template>
  <div>
    <slot></slot>
  </div>
</template>

<style scoped>
div {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  display: grid;
  place-content: center;
}
</style>
