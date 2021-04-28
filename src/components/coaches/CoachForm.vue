<template>
  <form @submit.prevent="submitForm">
    <base-overlay v-if="isLoading">
      <base-spinner></base-spinner>
    </base-overlay>
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">
        Firstname
      </label>
      <input
        type="text"
        id="firstname"
        :class="{ invalid: !firstName.isValid }"
        v-model.trim="firstName.value"
        @blur="firstName.validate"
      />
      <p v-if="!firstName.isValid">Firstname can not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">
        Lastname
      </label>
      <input
        type="text"
        id="lastname"
        :class="{ invalid: !lastName.isValid }"
        v-model.trim="lastName.value"
        @blur="lastName.validate"
      />
      <p v-if="!lastName.isValid">Firstname can not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">
        Description
      </label>
      <textarea
        id="description"
        v-model.trim="description.value"
        @blur="description.validate"
      />
      <p v-if="!description.isValid">Description can not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !hourlyRate.isValid }">
      <label for="rate">
        Hourly rate
      </label>
      <input
        type="number"
        id="rate"
        v-model.number="hourlyRate.value"
        :class="{ invalid: !hourlyRate.valid }"
        @input="hourlyRate.validate"
        @blur="hourlyRate.validate"
      />
      <p v-if="!hourlyRate.isValid">Description can not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <div>
        <input
          type="checkbox"
          value="frontend"
          id="area-frontend"
          v-model="areas.value"
          @change="areas.validate"
        />
        <label for="area-frontend">Frontend development</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="backend"
          id="area-backend"
          v-model="areas.value"
          @change="areas.validate"
        />
        <label for="area-backend">Backend development</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="career"
          id="area-career"
          v-model="areas.value"
          @change="areas.validate"
        />
        <label for="area-career">Career advisory</label>
      </div>
      <p v-if="!areas.isValid">Choose at least one area of expertise</p>
    </div>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  props: ["isLoading"],
  emits: ["submitted"],
  data() {
    return {
      formIsValid: true,
      firstName: {
        value: "",
        isValid: true,
        validate() {
          if (this.value == "") {
            this.isValid = false;
            this.formIsValid = false;
          } else {
            this.isValid = true;
            this.formIsValid = true;
          }
        },
      },
      lastName: {
        value: "",
        isValid: true,
        validate() {
          if (this.value == "") {
            this.isValid = false;
            this.formIsValid = false;
          } else {
            this.isValid = true;
            this.formIsValid = true;
          }
        },
      },
      description: {
        value: "",
        isValid: true,
        validate() {
          if (this.value == "") {
            this.isValid = false;
            this.formIsValid = false;
          } else {
            this.isValid = true;
            this.formIsValid = true;
          }
        },
      },
      hourlyRate: {
        value: "",
        isValid: true,
        validate() {
          if (!this.value || this.value < 0) {
            this.isValid = false;
            this.formIsValid = false;
          } else {
            this.isValid = true;
            this.formIsValid = true;
          }
        },
      },
      areas: {
        value: [],
        isValid: true,
        validate() {
          if (this.value.length == 0) {
            this.isValid = false;
            this.formIsValid = false;
          } else {
            this.isValid = true;
            this.formIsValid = true;
          }
        },
      },
    };
  },
  methods: {
    validateForm() {
      const inputs = [
        this.firstName,
        this.lastName,
        this.description,
        this.hourlyRate,
        this.areas,
      ];

      inputs.forEach((item) => item.validate());

      if (inputs.find((item) => !item.isValid)) {
        this.formIsValid = false;
      } else {
        this.formIsValid = true;
      }
    },

    submitForm() {
      this.validateForm();
      if (!this.formIsValid) return;

      const data = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        description: this.description.value,
        hourlyRate: this.hourlyRate.value,
        areas: this.areas.value,
      };
      this.$emit("submitted", data);
    },
  },
};
</script>

<style scoped>
form {
  position: relative;
}
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

textarea {
  resize: none;
  height: 101px;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
