<template>
  <section>
    <base-card>
      <h2>Register as a coach now</h2>
      <CoachForm :isLoading="isLoading" @submitted="createCoach" />
    </base-card>
  </section>
</template>

<script>
import CoachForm from "@/components/coaches/CoachForm.vue";
export default {
  components: {
    CoachForm,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    async createCoach(formData) {
      this.isSending = true;
      await this.$store.dispatch("coaches/createCoach", formData);
      this.isSending = false;
      this.$router.replace("/coaches");
    },
  },
};
</script>
