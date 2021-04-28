<template>
  <section class="auth">
    <base-dialog :show="!!error" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <base-overlay v-if="isLoading">
          <base-spinner></base-spinner>
        </base-overlay>
        <div class="form-control">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email.value"
            @blur="form.email.validate"
          />
          <p v-if="!form.email.isValid">Please, enter correct email</p>
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password.value"
            @blur="form.password.validate"
          />
          <p v-if="!form.password.isValid">Please, enter password</p>
        </div>
        <base-button type="submit">{{ submitText }}</base-button>
        <base-button type="button" mode="flat" @click="switchMode">{{
          switchText
        }}</base-button>
      </form>
    </base-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: {
          value: "",
          isValid: true,
          validate() {
            if (
              this.value == "" ||
              this.value.length < 6 ||
              !this.value.includes("@" || !this.value.includes("."))
            ) {
              this.isValid = false;
            } else {
              this.isValid = true;
            }
          },
        },
        password: {
          value: "",
          isValid: true,
          validate() {
            if (this.value == "" || this.value.length < 6) {
              this.isValid = false;
            } else {
              this.isValid = true;
            }
          },
        },
      },
      isValid: true,
      mode: "login",

      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitText() {
      return this.mode == "login" ? "Login" : "Sign up";
    },
    switchText() {
      return this.mode == "login"
        ? "Not registered yet?"
        : "Registered already?";
    },
  },
  methods: {
    validateForm() {
      this.form.email.validate();
      this.form.password.validate();
      if (this.form.email.isValid && this.form.password.isValid) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    },
    async submitForm() {
      this.validateForm();
      if (!this.isValid) return false;

      try {
        await this.$store.dispatch("auth", {
          email: this.form.email.value,
          password: this.form.password.value,
          mode: this.mode,
        });
        const redirectUrl = "/" + (this.$route.query.redirect || "coaches");
        this.$router.replace(redirectUrl);
      } catch (error) {
        this.error = error;
      }
    },
    switchMode() {
      if (this.mode == "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  position: relative;
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
</style>
