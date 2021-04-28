<template>
  <div v-if="coach">
    <section>
      <base-card>
        <h2>{{ fullname }}</h2>
        <h3>${{ coach.hourlyRate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested?Reach out now!</h2>
          <base-button :to="contactLink">Contact</base-button>
        </header>

        <router-view v-slot="{ Component }">
          <transition name="fadeIn">
            <component :is="Component" />
          </transition>
        </router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in coach.areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ coach.description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      coach: null,
    };
  },
  computed: {
    contactLink() {
      return `/coaches/${this.id}/contact`;
    },
    fullname() {
      return `${this.coach.firstName} ${this.coach.lastName}`;
    },
    coaches() {
      return this.$store.getters["coaches/coaches"];
    },
  },
  methods: {
    async loadCoach() {
      if (this.coaches.length > 0) {
        this.coach = this.coaches.find((coach) => coach.id == this.id);
      } else {
        await this.$store.dispatch("coaches/loadCoach", this.id);
        this.coach = this.$store.getters["coaches/currentCoach"];
      }
    },
  },
  created() {
    this.loadCoach();
  },
};
</script>

<style scoped>
.fadeIn-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.fadeIn-enter-to {
  opacity: 1;
  transform: translateX(0px);
  transition: all 0.6s;
}
</style>
