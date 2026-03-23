<template>
  <div class="d-flex justify-center align-items-center" style="height: 100vh">
    <v-row class="fill-height no-gutters ">
      <v-col
        cols="12"
        md="6"
        class="d-none d-md-flex align-center justify-center"
      >
        <v-card flat class="pa-6 text-center logo-container">
          <v-img
            src="@/assets/ingco-logo.png"
            alt="INGCOPH Logo"
            contain
            max-width="250"
            class="mx-auto rounded-lg"
          ></v-img>
          <h1 class="mt-6 font-weight-bold text-h4">Welcome to INGCOPH</h1>
          <p class="mt-2 text-subtitle-1 text--secondary">
            #1 Power Tools Seller in the Philippines
          </p>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="d-flex align-center justify-center primary px-6"
      >
        <v-card flat class="form-container">
          <v-img
            src="@/assets/ingco-logo.png"
            alt="INGCOPH Logo"
            contain
            max-width="100"
            class="d-block d-md-none mx-auto rounded-lg"
          ></v-img>
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
import SigninForm from "@/components/Auth/SigninForm.vue";
import SignupForm from "@/components/Auth/SignupForm.vue";

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

.form-container {
  /* width: 400px; */
  padding: 12px;
  max-width: 90%;
}
.logo-container {
  background-color: transparent;
}
@media (min-width: 1264px) {
  .form-container {
    min-width: 500px;
  }
}
</style>
