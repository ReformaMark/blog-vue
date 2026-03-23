<template>
  <v-form ref="signinForm" @submit.prevent="handleSignin">
    <v-card-title class="text-h5">Sign In</v-card-title>
    <v-card-text>
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
    </v-card-text>

    <v-card-actions class="flex-column">
      <v-btn
        type="submit"
        color="primary"
        :loading="loading"
        class="mb-2"
        block
      >
        Sign In
      </v-btn>
      <p class="mt-2 text-sm-label-small">
        Don't have an account?
        <v-btn @click="$emit('switch-to-signup')" text> Sign Up </v-btn>
      </p>
    </v-card-actions>
  </v-form>
</template>

<script>
import { emailRules, passwordRules } from "@/composables/useValidation";
import { mapActions } from "vuex";

export default {
  name: "SigninForm",
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      emailRules,
      passwordRules,
    };
  },
  methods: {
    ...mapActions('user', ['login']),
   async handleSignin() {
      if (this.$refs.signinForm.validate()) {
        this.loading = true;
        try {
          const payload = {
            email: this.email,
            password: this.password,
          }

          // Perform signin logic here, e.g., API call
          console.log("Signing in with:", payload);

          const result = await this.login(payload)
          console.log("Login success:", result)
          this.$router.push('/')
        } catch (error) {
          console.error("Signin error:", error);
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>
