<template>
  <v-app-bar app color="orange" dark class="px-10">
    <div class="d-flex align-center">
        <v-app-bar-nav-icon class="grey--white" @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>IngcoPH</v-toolbar-title>
    </div>
    <v-spacer> </v-spacer>
    <v-toolbar-items class="d-none d-md-flex">
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/dashboard">Dashboard</v-btn>
      <v-btn text to="/blogs">Blogs</v-btn>
      <v-btn text to="/about">About</v-btn>
    </v-toolbar-items>
    <v-spacer> </v-spacer>
    
  </v-app-bar>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: "NavigationBar",
  computed: {
    drawer: {
      get() {
        return this.$store.getters["DRAWER"];
      },
      set(value) {
        this.$store.commit("SET_DRAWER", value);
      },
    },
  },
  methods: {
    ...mapMutations(["SET_DRAWER"]),
    toggleDrawer() {
      this.SET_DRAWER(!this.drawer);
    },
  },
 
};
</script>
