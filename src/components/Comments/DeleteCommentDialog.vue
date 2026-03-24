<template>
  <v-dialog
    v-model="internalDialog"
    max-width="600"
    @input="$emit('input', internalDialog)"
  >
    <v-card class="dialog-card">
      <!-- Header -->
      <v-card-title class="justify-center">
        <v-icon color="red" class="mr-2">mdi-alert</v-icon>
        <span class="headline">Confirm Deletion</span>
      </v-card-title>

      <!-- Message -->
      <v-card-text class="text-center">
        <p>Are you sure you want to delete this comment?</p>
        <v-chip color="red lighten-4" text-color="red darken-2" class="mt-3">
          <v-icon left small color="red darken-2">mdi-note-text</v-icon>
          {{ comment.content }}
        </v-chip>
      </v-card-text>

      <!-- Actions -->
      <v-card-actions class="justify-center">
        <v-btn text color="grey darken-1" @click="closeDialog">
          <v-icon left>mdi-close</v-icon>
          No
        </v-btn>
        <v-btn color="red darken-2" dark @click="confirmDelete(comment.id)">
          <v-icon left>mdi-delete</v-icon>
          Yes, Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "DeleteCommentDialog",
  props: {
    value: { type: Boolean, default: false }, // controlled by parent
    comment: { type: Object, required: true }
  },
  data: () => ({
    internalDialog: false
  }),
  watch: {
    value(val) {
      this.internalDialog = val
    }
  },
  methods: {
    ...mapActions('comments', ['deleteComment']),
    closeDialog() {
      this.internalDialog = false
      this.$emit('input', false)
    },
    confirmDelete(commentId) {
      this.deleteComment(commentId)
      this.closeDialog()
    }
  }
}
</script>
