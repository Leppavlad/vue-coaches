<template>
  <div>
    <base-dialog :show="!!error" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-card>
      <section>
        <coach-filters @filter="handleFilters"></coach-filters>
      </section>
    </base-card>
    <base-card>
      <section>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >REFRESH</base-button
          >
          <base-button v-if="!isLoggedIn" to="/auth?redirect=register"
            >Login to register as a coach</base-button
          >
          <base-button
            to="/register"
            v-if="isLoggedIn && !isCoach && !isLoading"
          >
            Register as a coach
          </base-button>
        </div>
      </section>
      <section>
        <base-spinner :wrapper="true" v-if="isLoading"></base-spinner>
        <ul v-else-if="!isLoading && hasCoaches">
          <coach
            v-for="coach in coachesFiltered"
            :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :areas="coach.areas"
            :description="coach.description"
            :rate="coach.hourlyRate"
          ></coach>
        </ul>
        <h2 v-else>No coaches found</h2>
      </section>
    </base-card>
  </div>
</template>

<script>
import CoachFilters from "@/components/coaches/CoachFilters.vue";
import Coach from "@/components/coaches/CoachItem.vue";
export default {
  components: {
    CoachFilters,
    Coach,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      filters: "all",
    };
  },
  computed: {
    userId() {
      return this.$store.getters["userId"];
    },
    coachesFiltered() {
      return this.$store.getters["coaches/coachesFiltered"];
    },
    hasCoaches() {
      return this.$store.getters["coaches/hasCoachesFiltered"];
    },
    isCoach() {
      const userId = this.$store.getters["userId"];
      const coaches = this.$store.getters["coaches/coaches"];
      for (let coach of coaches) {
        if (userId == coach.id) return true;
      }
      return false;
    },
    isLoggedIn() {
      return this.$store.getters["isAuthenticated"];
    },
  },
  methods: {
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/loadCoaches", {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong";
      }
      this.filterCoaches(this.filters);
      this.isLoading = false;
    },
    handleFilters(filters) {
      this.filters = filters;
      this.filterCoaches();
    },
    filterCoaches() {
      this.$store.dispatch("coaches/filterCoaches", this.filters);
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.loadCoaches();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
