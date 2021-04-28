<template>
  <div class="wrapper" v-if="wrapper">
    <div class="outer">
      <div class="inner">Not yet</div>
    </div>
  </div>
  <div class="outer" v-if="!wrapper">
    <div class="inner">Not yet</div>
  </div>
</template>

<script>
export default {
  props: ["wrapper"],
};
</script>

<style scoped>
@keyframes spinner {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes glow {
  0% {
    box-shadow: 0 0 5px black;
  }
  30% {
    box-shadow: 0 0 15px red;
  }
  60% {
    box-shadow: 0 0 5px yellow;
  }
  90% {
    box-shadow: 0 0 15px purple;
  }
  100% {
    box-shadow: 0 0 5px black;
  }
}

.wrapper {
  width: 100%;
  height: 245px;
  display: grid;
  place-content: center;
}
.outer {
  display: grid;
  place-content: center;
  width: 50px;
  height: 50px;
  border-radius: 30%;
  animation: spinner 10s infinite linear, glow 5s infinite linear 3s;
  box-shadow: 0 0 5px;
}

.inner {
  font-weight: bold;
  text-align: center;
  transform: translate(50%);
  animation: spinner 3s infinite linear reverse;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}
</style>
