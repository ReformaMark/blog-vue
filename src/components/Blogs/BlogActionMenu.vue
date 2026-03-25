<template>
  <v-container>
    <v-menu v-model="showMenu" offset-y bottom left>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon color="primary darken-1">mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list dense>
        <v-list-item @click="handleMenuClick('edit')">
          <v-list-item-icon>
            <v-icon>mdi-pencil</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Edit</v-list-item-title>
        </v-list-item>

        <!-- Delete list item opens dialog -->
        <v-list-item @click="showDeleteDialog = true">
          <v-list-item-icon>
            <v-icon color="red">mdi-delete</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Delete</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- bind dialog visibility -->
    <delete-blog-dialog
      v-model="showDeleteDialog"
      :blog="blog"
    />

    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      :color="snackbarColor"
      bottom
      right
    >
      {{ snackbarMessage }}
      <v-btn text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import DeleteBlogDialog from './DeleteBlogDialog.vue'

export default {
  name: 'BlogActionMenu',
  props: {
    blog: { type: Object, required: true }
  },
  data: () => ({
    showMenu: false,
    showDeleteDialog: false,
    snackbar: false,
    snackbarMessage: "",
    snackbarColor: "success",
  }),
  computed: {
    ...mapState('blogs',['isEditing']),
    editing () {
      return this.isEditing
    }
  },
  components: { DeleteBlogDialog },
  methods: {
    ...mapActions('blogs', ['setEditing']),
    handleMenuClick(action) {
      if (action === 'edit') {
        this.setEditing(true)
        //show snackbar
        this.snackbarMessage = "Editing content"
        this.snackbarColor = "info"   // or "primary", "success", etc.
        this.snackbar = true
        console.log(this.snackbar)
      }
      // this.showMenu = false
    }
  }
}
</script>
