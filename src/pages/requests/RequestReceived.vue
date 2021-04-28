<template>
  <section>
    <base-card>
      <base-dialog :show="!!error" @close="handleError">
        <p>{{ error }}</p>
      </base-dialog>
      <header>
        <h2>Requests</h2>
      </header>
      <base-spinner :wrapper="true" v-if="isLoading"></base-spinner>
      <ul v-else-if="!isLoading && hasRequests">
        <request-item
          v-for="request in requests"
          :key="request.id"
          :email="request.from"
          :message="request.message"
        >
          {{ request }}
        </request-item>
      </ul>
      <h3 v-else>You haven't received any requests yet</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItem from "@/components/requests/RequestItem";
export default {
  components: {
    RequestItem,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    requests() {
      return this.$store.getters["requests/requests"];
    },
    hasRequests() {
      return this.$store.getters["requests/hasRequests"];
    },
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("requests/loadRequests");
      } catch (error) {
        this.error = error.message || "Couldn't load requests";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.loadRequests();
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
