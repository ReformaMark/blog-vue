<template>
  <div>
    <v-form ref="signupForm" @submit.prevent="handleSignup">
      <v-card-title class="text-h5">Sign up</v-card-title>
      <v-container v-if="error" max-width="400">
        <v-banner color="red lighten-5" dense class="mb-4">
          <v-row align="center" no-gutters>
            <v-col cols="auto" class="mr-2">
              <v-icon color="red">mdi-alert-circle</v-icon>
            </v-col>

            <v-col>
              <span class="red--text">
                {{ error }}
              </span>
            </v-col>
          </v-row>
        </v-banner>
      </v-container>
      <v-card-text>
        <v-text-field
          v-model="name"
          label="Name"
          required
          :rules="nameRules"
          outlined
          dense
        ></v-text-field>

        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          required
          :rules="emailRules"
          outlined
          dense
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          required
          :rules="passwordRules"
          outlined
          dense
        ></v-text-field>

        <v-text-field
          v-model="confirmPassword"
          label="Confirm Password"
          type="password"
          required
          :rules="passwordConfirmedRules"
          outlined
          dense
        ></v-text-field>

        <v-card-actions class="">
          <v-btn
            type="submit"
            color="primary"
            :loading="loading"
            :disabled="loading"
            class=""
            block
          >
            Sign Up
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-form>
    <p class="mt-auto text-center">
      Already have an account?
      <v-btn @click="$emit('switch-to-signin')" text> Sign In</v-btn>
    </p>
  </div>
</template>

<script>
import {
  confirmPasswordRules,
  emailRules,
  nameRules,
  passwordRules,
} from "@/composables/useValidation";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SignupForm",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      loading: false,
      nameRules,
      passwordRules,
      emailRules,
    };
  },
  computed: {
    ...mapGetters("user", ["error"]),
    passwordConfirmedRules() {
      return confirmPasswordRules(this.password);
    },
  },
  methods: {
    ...mapActions("user", ["register"]),
    async handleSignup() {
      if (this.$refs.signupForm.validate()) {
        this.loading = true;
        try {
          const payload = {
            name: this.name,
            email: this.email,
            password: this.password,
          };
          // Emit event or handle response
          await this.register(payload);
        } catch (error) {
          console.error("Signup error:", error);
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>

<style scoped>
.form-container {
  min-width: 500px;
  max-width: 90%;
}
</style>
