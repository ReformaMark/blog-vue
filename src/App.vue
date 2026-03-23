<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import AuthLayout from '@/layouts/AuthLayout.vue'
import DefaultLayout from './layouts/DefaultLayout.vue';
export default {
  name: "App",

  data: () => ({
    //
  }),
  computed: {
    layout() {
      const layout = this.$route.meta.layout || 'default'
      return layout === 'auth' ? AuthLayout : DefaultLayout
    }
  }
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
