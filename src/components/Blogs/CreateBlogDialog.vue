<template>
<v-dialog v-model="showDialog" max-width="1000">
    <template v-slot:activator="{ on, attrs }">
        <v-btn
        v-on="on"
        v-bind="attrs"
        color="blue"
        dark
        >
        Create new blogs
        </v-btn>
    </template>

  <template >
    <v-card title="Dialog" class="h-auto dialog-card">
      <create-blog-form @close="showDialog = false" />>
      <v-card-actions>
        <v-spacer></v-spacer>

        
      </v-card-actions>
    </v-card>
  </template>
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
    height: 550px;
}
</style>