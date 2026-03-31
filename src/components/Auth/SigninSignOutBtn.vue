<template>
  <div>
    <v-btn
      v-if="hasUser"
      text
      class="blue white--text"
      type="button"
      @click="logoutUser"
    >
      <v-icon left>mdi-logout</v-icon>
      <span>Logout</span>
    </v-btn>

    <v-btn
      v-else
      to="/auth"
      text
      class="orange white--text"
      type="button"
    >
      <v-icon left>mdi-login</v-icon>
      <span>Sign In</span>
    </v-btn>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

    export default {
        name: 'SigninSignOutBtn',
        computed: {
            ...mapGetters("user", ["hasUser"]),
        },
        methods: {
            ...mapMutations("user", ["SET_USER", "CLEAR_USER"]),
            ...mapActions("user", ["logout"]),
            async logoutUser() {
            await this.logout();
            this.$router.push("/auth");
            },
        },
    };

</script>