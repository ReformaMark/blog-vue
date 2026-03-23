<template>
    <v-app-bar
      app
      color="orange"
      dark
      class="px-10"
    >
    <div class="d-flex align-center">
        <h1 class="">IngcoPH</h1>
    </div>
  <v-spacer>
        
    </v-spacer>
    <v-toolbar-items>
        <v-btn text to="/">Home</v-btn>
        <v-btn text to="/dashboard">Dashboard</v-btn>
        <v-btn text to="/blogs">Blogs</v-btn>
        <v-btn text to="/about">About</v-btn>
    </v-toolbar-items>
    <v-spacer>
        
    </v-spacer>

    
    <v-btn
        v-if="hasUser"
        text
        class="blue"
        type="submit"
        @click="logout"
    >
        <span class="mr-2">Logout</span>
    </v-btn>
    <v-btn
        v-if="!hasUser"
        to="/signin"
        text
        class="orange"
    >
        <span class="mr-2">Sign In</span>
    </v-btn>
    </v-app-bar>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'NavigationBar',

    computed: {
        ...mapGetters('user', ['hasUser']),
    },
    methods: {
        ...mapMutations('user', ['SET_USER', 'CLEAR_USER']),
       logout() {
            this.$store.commit('user/CLEAR_USER')
            this.$router.push('/auth')  
       }
    }
}

</script>