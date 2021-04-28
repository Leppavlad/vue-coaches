<template>
  <h2>
    Find your coach
  </h2>
  <span
    class="filter-option"
    v-for="filter in filters"
    :key="filter.id"
    @change="setFilter"
  >
    <input
      type="checkbox"
      :name="filter.id"
      :id="filter.id"
      v-model="filter.checked"
    />
    <label :for="filter.id">{{ filter.label }}</label>
  </span>
</template>

<script>
export default {
  emits: ["filter"],
  data() {
    return {
      filters: [
        {
          id: "frontend",
          label: "Frontend",
          checked: true,
        },
        {
          id: "backend",
          label: "Backend",
          checked: true,
        },
        {
          id: "career",
          label: "Career",
          checked: true,
        },
      ],
    };
  },
  methods: {
    setFilter() {
      this.$emit("filter", this.filters);
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
