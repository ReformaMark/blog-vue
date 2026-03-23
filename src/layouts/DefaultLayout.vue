<template>
  <v-app class="main-container">
    <navigation-bar/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavigationBar from '@/components/NavigationBar';
export default {

  name: 'DefaultLayout',

  data: () => ({
    //
  }),
  components: {
    NavigationBar,
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