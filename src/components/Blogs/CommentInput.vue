<template>

  <v-row   class="d-flex justify-lg-space-between">
  <v-col cols="12" sm="12" class="d-flex align-center grey lighten-3 pb-0 mb-0 ">
    <v-textarea
      class="mx-2 pb-0 mb-0  no-gutters"
      label="Add Comment"
      prepend-icon="mdi-comment"
      solo
      rows="1"
    
    ></v-textarea>
  </v-col>

    <v-col  no-gutters cols="12" sm="12" class="d-flex align-center justify-end my-0">
        <div class="">

            <v-btn color="primary" block>Submit</v-btn>
        </div>
    </v-col>
</v-row>


</template>
<script>
export default {
    name: 'CommentInput',
    data: () => ({
        
    })
}
</script>