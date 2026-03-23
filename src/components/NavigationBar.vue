<template>
  <v-app-bar app color="orange" dark class="px-10">
    <div class="d-flex align-center">
      <h1 class="">IngcoPH</h1>
    </div>
    <v-spacer> </v-spacer>
    <v-toolbar-items>
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/dashboard">Dashboard</v-btn>
      <v-btn text to="/blogs">Blogs</v-btn>
      <v-btn text to="/about">About</v-btn>
    </v-toolbar-items>
    <v-spacer> </v-spacer>

    <v-btn v-if="hasUser" text class="blue" type="button" @click="logoutUser">
      <span class="mr-2">Logout</span>
    </v-btn>
    <v-btn v-if="!hasUser" to="/auth" type="button" text class="orange">
      <span class="mr-2">Sign In</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "NavigationBar",

  computed: {
    ...mapGetters("user", ["hasUser"]),
  },
  methods: {
    ...mapMutations("user", ["SET_USER", "CLEAR_USER"]),
    ...mapActions("user", ["logout"]),
    async logoutUser() {
      await this.logout();
      this.$router.push("/auth");
    },
  },
};
</script>
