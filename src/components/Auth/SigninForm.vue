<template>
  <v-form ref="signinForm" @submit.prevent="handleSignin">
    <v-card-title class="text-h5">Sign In</v-card-title>
    <v-container v-if="error" max-width="400">
      <v-banner color="red lighten-5" class="">
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
        <v-btn @click="handleSwitchToSignup" text> Sign Up </v-btn>
      </p>
    </v-card-actions>
  </v-form>
</template>

<script>
import { emailRules, passwordRules } from "@/composables/useValidation";
import { mapActions, mapGetters, mapMutations } from "vuex";

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
  computed: {
    ...mapGetters("user", ["error"]),
  },
  methods: {
    ...mapActions("user", ["login"]),
    ...mapMutations("user", ["CLEAR_ERROR"]),
    async handleSignin() {
      if (this.$refs.signinForm.validate()) {
        this.loading = true;
        this.clearErrorMessage();
        try {
          const payload = {
            email: this.email,
            password: this.password,
          };
          await this.login(payload);
          this.$router.push("/");
        } catch (error) {
          console.error("Signin error:", error);
        } finally {
          this.loading = false;
        }
      }
    },

    clearErrorMessage() {
      this.CLEAR_ERROR();
    },
    handleSwitchToSignup() {
      this.clearErrorMessage();
      this.$emit("switch-to-signup");
    },
  },
};
</script>
