<template>
  <li>
    <h3>{{ fullname }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <base-badge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
      ></base-badge>
    </div>
    <div class="actions">
      <base-button :to="linkContact" mode="outline">Contact me</base-button>
      <base-button :to="linkDetails">View details</base-button>
    </div>
    <p>{{ description }}</p>
  </li>
</template>

<script>
export default {
  props: ["id", "firstName", "lastName", "areas", "description", "rate"],
  computed: {
    fullname() {
      return `${this.firstName} ${this.lastName}`;
    },
    linkContact() {
      return `${this.$route.path}/${this.id}/contact`;
    },
    linkDetails() {
      return `${this.$route.path}/${this.id}`;
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
