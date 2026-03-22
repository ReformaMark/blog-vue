<template>
  <v-form ref="signupForm" @submit.prevent="handleSignup">
    <v-text-field
      v-model="name"
      label="Name"
      required
      :rules="nameRules"
    ></v-text-field>

    <v-text-field
      v-model="email"
      label="Email"
      type="email"
      required
      :rules="emailRules"
    ></v-text-field>

    <v-text-field
      v-model="password"
      label="Password"
      type="password"
      required
      :rules="passwordRules"
    ></v-text-field>

    <v-text-field
      v-model="confirmPassword"
      label="Confirm Password"
      type="password"
      required
      :rules="confirmPasswordRules"
    ></v-text-field>

    <v-btn type="submit" color="primary" :loading="loading"> Sign Up </v-btn>
    <v-btn @click="$emit('switch-to-signin')" variant="text"
      >Already have an account? Sign In</v-btn
    >
  </v-form>
</template>

<script>
export default {
  name: "SignupForm",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      loading: false,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length >= 2 || "Name must be at least 2 characters",
      ],
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 6 || "Password must be at least 6 characters",
      ],
      confirmPasswordRules: [
        (v) => !!v || "Confirm Password is required",
        (v) => v === this.password || "Passwords do not match",
      ],
    };
  },
  methods: {
    async handleSignup() {
      if (this.$refs.signupForm.validate()) {
        this.loading = true;
        try {
          // Perform signup logic here, e.g., API call
          console.log("Signing up with:", {
            name: this.name,
            email: this.email,
            password: this.password,
          });
          // Emit event or handle response
          this.$emit("signup", {
            name: this.name,
            email: this.email,
            password: this.password,
          });
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
