<template>
  <div class="d-flex justify-center align-items-center" style="height: 100vh">
    <v-row class="fill-height no-gutters">
      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <v-card flat class="pa-6 text-center">
          <!-- Logo -->
          <v-img
            src="@/assets/ingco-logo.png"
            alt="INGCOPH Logo"
            contain
            max-width="250"
            class="mx-auto rounded-lg"
          ></v-img>

          <!-- Heading -->
          <h1 class="mt-6 font-weight-bold text-h4">Welcome to INGCOPH</h1>

          <!-- Subtitle -->
          <p class="mt-2 text-subtitle-1 text--secondary">
            #1 Power Tools Seller in the Philippines
          </p>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="d-flex align-center justify-center primary"
      >
        <v-card flat class="" max-width="500" min-width="500">
          <SigninForm
            v-if="step === 'signin'"
            @switch-to-signup="step = 'signup'"
          />
          <SignupForm v-else @switch-to-signin="step = 'signin'" />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import SigninForm from "@/components/Auth/Signin/SigninForm.vue";
import SignupForm from "@/components/Auth/Signup/SignupForm.vue";

export default {
  name: "AuthView",
  components: {
    SigninForm,
    SignupForm,
  },
  data() {
    return {
      step: "signin", // signin or signup
    };
  },
};
</script>

<style scoped>
.container-logo {
  min-width: 100vh;
  background-color: black;
}
</style>
