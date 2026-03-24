<template>
  <v-row class="d-flex justify-lg-space-between">
    <v-col cols="12" sm="12" class="d-flex flex-column grey lighten-3 pb-0 mb-0">
      <v-textarea
        class="mx-2 pb-0 mb-0 no-gutters"
        label="Add Comment"
        prepend-icon="mdi-comment"
        solo
        v-model="comment"
        rows="1"
      ></v-textarea>
    </v-col>

    <v-col no-gutters cols="12" sm="12" class="d-flex align-center justify-end my-0">
     <div class="">
      
      <v-btn 
        @click="handleSubmitComment"  
        color="primary" 
        block
        :disabled="loading"
      >
        Submit
      </v-btn>
      
     </div>
    </v-col>

    <!-- Snackbar for feedback -->
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
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CommentInput',
  data: () => ({
    comment: "",
    loading: false,
    snackbar: false,
    snackbarMessage: "",
    snackbarColor: "success"
  }),
  props: {
    blogId: { type: Number, required: true }
  },
  computed: {
    ...mapGetters('user', ['getUser'])
  },
  methods: {
    ...mapActions('comments', ['addComment']),
    async handleSubmitComment () {
      this.loading = true;
      try {
        if (!this.comment) {
          this.snackbarMessage = "Comment cannot be empty.";
          this.snackbarColor = "error";
          this.snackbar = true;
        } else {
          const payload = {
            content: this.comment,
            blog_id: this.blogId,
            user_id: this.getUser.id
          };
          await this.addComment(payload);
          this.snackbarMessage = "Comment added successfully!";
          this.snackbarColor = "success";
          this.snackbar = true;
          this.comment = "";
        }
      } catch (error) {
        this.snackbarMessage = "Something went wrong. Please try again.";
        this.snackbarColor = "error";
        this.snackbar = true;
      }
      this.loading = false;
    }
  }
};
</script>
