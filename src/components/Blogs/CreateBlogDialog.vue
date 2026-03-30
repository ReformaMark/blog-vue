<template>
  <v-dialog v-model="showDialog" max-width="1000">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-on="on"
        v-bind="attrs"
        color="blue"
        dark
      >
        <v-icon left>mdi-plus</v-icon>
        blogs
      </v-btn>
    </template>

    <v-card class="dialog-card" outlined>
      <!-- Your form -->
      <create-blog-form @close="showDialog = false" />

      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CreateBlogForm from './CreateBlogForm';

export default {
  name: "CreateBlogDialog",
  data: () => ({
    showDialog: false
  }),
  components: {
    CreateBlogForm,
  }
}
</script>

<style scoped>
.dialog-card {
  height: auto;        /* Let it grow based on content */
  max-height: 90vh;    /* Optional: prevent it from going off screen */
  overflow-y: auto;    /* Scroll if content is too tall */
}
</style>