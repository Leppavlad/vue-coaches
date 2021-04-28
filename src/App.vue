<template>
  <TheHeader />
  <router-view v-slot="{ Component }">
    <transition name="popUp" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import TheHeader from "./components/layout/TheHeader";
export default {
  components: {
    TheHeader,
  },
  created() {
    this.$store.dispatch("autoLogin");
  },
  computed: {
    didLogout() {
      return this.$store.getters["didLogout"];
    },
  },
  watch: {
    didLogout(current, previous) {
      if (current && current != previous) {
        this.$router.replace("/coaches");
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

.popUp-enter-active {
  animation: fadeIn 0.3s ease-out;
}
.popUp-leave-active {
  animation: fadeIn 0.2s ease-in reverse;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(1);
  }
  to {
    opacity: 1;
    transform: translateY(0px) scale(1);
  }
}
</style>
