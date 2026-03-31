<template>
  <v-app class="main-container">
    <v-navigation-drawer app v-model="drawer" color="orange" class="dark d-flex flex-column">
      <v-container>
        <v-row align="center" justify="center" class="white">
          <v-col cols="12" class="text-center">
              <v-img src="/ingco-logo.png"></v-img>
            <!-- <div class="white--text text-h6 font-weight-bold">IngcoPH</div> -->
          </v-col>
        </v-row>
      </v-container>
      <v-list class="" to="/">
        <v-list-item link to="/">
          <v-list-tile  class="d-flex align-center">
            <v-list-tile-action class="mr-3">
              <v-icon class="white--text">mdi-home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-item-title class="white--text">Home</v-list-item-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-item>
        <v-list-item link to="/dashboard">
          <v-list-item-title class="white--text">Dashboard</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/blogs">
          <v-list-item-title class="white--text">Blogs</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/about">
          <v-list-item-title class="white--text">About</v-list-item-title>
        </v-list-item>
      </v-list>

      <!-- Push the sign in/out button to bottom -->
      <div class="mt-auto d-flex justify-center">
        <signin-sign-out-btn class="white--text"/>
      </div>
     
 
    </v-navigation-drawer>
    <navigation-bar/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import SigninSignOutBtn from '@/components/Auth/SigninSignOutBtn.vue';
import NavigationBar from '@/components/NavigationBar';
export default {
  name: 'DefaultLayout',
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
  components: {
    NavigationBar,
    SigninSignOutBtn
  }
};
</script>

<style >

  .main-container {
    min-height: 100vh;
    background-color: black;
  }

  .v-application {
  background-color: #f0f0f0 !important;
}
</style>