<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style scoped>
#app,
.v-application {
  height: 100%;
}
.v-main {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
</style>
