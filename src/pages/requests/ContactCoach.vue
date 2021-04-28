<template>
  <div>
    <h2>Contact coach</h2>
    <form @submit.prevent="sendRequest">
      <div class="form-control">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model.trim="email.value"
          @blur="email.validate"
        />
        <p v-if="!email.isValid">Input correct email address</p>
      </div>
      <div class="form-control">
        <label for="message">Message</label>
        <textarea
          id="message"
          v-model.trim="message.value"
          @blur="message.validate"
        />
        <p v-if="!message.isValid">Input your message</p>
      </div>
      <div class="actions">
        <base-button>Send</base-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formIsValid: true,
      email: {
        value: "",
        isValid: true,
        validate() {
          if (
            !this.value.includes("@") ||
            !this.value.includes(".") ||
            this.value == ""
          ) {
            this.isValid = false;
          } else {
            this.isValid = true;
          }
        },
      },
      message: {
        value: "",
        isValid: true,
        validate() {
          if (this.value == "") {
            this.isValid = false;
          } else {
            this.isValid = true;
          }
        },
      },
    };
  },
  methods: {
    validateForm() {
      this.email.validate();
      this.message.validate();
      if (!this.email.isValid || !this.message.isValid) {
        this.formIsValid = false;
      } else {
        this.formIsValid = true;
      }
    },
    sendRequest() {
      this.validateForm();
      const request = {
        to: this.$route.params.id,
        from: this.email.value,
        message: this.message.value,
      };
      if (this.formIsValid) {
        this.$store.dispatch("requests/sendRequest", request);
        this.$router.replace("/coaches");
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

textarea {
  resize: none;
  height: 101px;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
