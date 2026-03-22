<template>
  <v-card>
    <signin-form />
  </v-card>
</template>

<script>
import SigninForm from "./SigninForm.vue";

export default {
  name: "SigninContainer",
  components: {
    SigninForm,
  },
};
</script>
