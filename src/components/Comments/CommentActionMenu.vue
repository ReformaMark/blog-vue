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
    <delete-comment-dialog
      v-model="showDeleteDialog"
      :comment="comment"
    />
  </v-container>
</template>

<script>
import DeleteCommentDialog from './DeleteCommentDialog.vue';



export default {
  name: 'CommentActionMenu',
  props: {
    comment: { type: Object, required: true }
  },
  data: () => ({
    showMenu: false,
    showDeleteDialog: false
  }),
  components: { DeleteCommentDialog },
  methods: {
    handleMenuClick(action) {
      this.showMenu = false
      if (action === 'edit') {
        console.log('Edit clicked')
      }
    }
  }
}
</script>
