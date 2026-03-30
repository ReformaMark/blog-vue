<template>
  <v-snackbar
    v-model="snackbar"
    :color="snackbarColor"
    timeout="3000"
    bottom
    right
  >
    {{ snackbarMessage }}

    <template v-slot:action="{ attrs }">
      <v-btn
        text
        v-bind="attrs"
        @click="hideSnackbar"
      >
        Close
      </v-btn>
    </template>

  </v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  computed: {
    ...mapGetters("snackbar", [
      "snackbar",
      "snackbarMessage",
      "snackbarColor"
    ])
  },
  methods: {
    ...mapActions("snackbar", ["hideSnackbar"])
  }
}
</script>