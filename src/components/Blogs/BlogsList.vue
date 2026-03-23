<template>
  <v-container>
    <v-row justify="space-between"  >
        <v-col cols="auto">
            <h2>Blog list</h2>
          
        </v-col>
        <v-col cols="auto">
            <create-blog-dialog/>
        </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="blog in blogs"
        :key="blog.id"
        cols="12"
        sm="6"
        md="6"
      >
      <v-card elevation="2">
        <v-img
          height="250"
          :src="blog.image || require('@/assets/default.svg')"
          alt="blog image"
          cover
        ></v-img>
                
        <v-card-title class="d-flex align-center">
          <v-icon class="mr-2" color="grey darken-1">mdi-calendar</v-icon>
          <span class="grey--text text--darken-1 text-display-large text-capitalize">
            {{ formatDate(blog.created_at) }}
          </span>
        </v-card-title>
        <v-card-title class="mb-0 pb-0">
          <v-row justify="space-between" align="center" class=" ">
          
            <v-col cols="auto" class="d-flex align-center">
          
               <p class=" text--darken-1 text-h5 black--text two-line-truncate">
                {{ blog.title }} 
              </p>
            </v-col>

     
          </v-row>
        
        </v-card-title>

        <v-card-text>
          <p class="two-line-truncate">

            {{ blog.content }}
          </p>
        </v-card-text>

      

       <v-card-actions class="d-flex justify-space-between pl-3 pr-3">
          <div class="">
            <v-avatar size="40" color="primary" class="mr-3">
              <span class="white--text">
                {{ blog.user?.name?.charAt(0).toUpperCase() }}
              </span>
            </v-avatar>
            {{ blog.user?.name }}
          </div>
  
          <v-card-subtitle>
            <v-btn @click="handleViewBlog(blog)">
              View Blog
            </v-btn>
          </v-card-subtitle>
      </v-card-actions>
      </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { mapActions, mapGetters } from 'vuex';
import CreateBlogDialog from './CreateBlogDialog.vue';
dayjs.extend(relativeTime)
export default {
    name: 'BlogsList',
    components: {
      CreateBlogDialog,
    },
    computed: {
        ...mapGetters('blogs', ['blogs']),
        ...mapGetters('user', ['getUser']),
    },
    methods: {
        ...mapActions('blogs', ['fetchBlogs', 'setBlog']),
        formatDate(date){
          return dayjs(date).fromNow()
        },
        handleViewBlog(blog){
          this.setBlog(blog)
   
          this.$router.push({ name: 'blog-details', params: { id: blog.id } })
        }
    },
    mounted() {
        this.fetchBlogs()

    }


}
</script>

<style scoped>
.two-line-truncate {
  display: -webkit-box;        /* enables flexbox for webkit */
 -webkit-line-clamp: 2;   /* number of lines to show */
  -webkit-box-orient: vertical;
  overflow: hidden;            /* hides overflowing text */
  text-overflow: ellipsis;     /* adds the "..." */
  white-space: normal; 
  line-height: 1.6rem;        /* allows wrapping */
  min-height: 50px;

}

.two-line-truncate-content {
    display: -webkit-box;        /* enables flexbox for webkit */
 -webkit-line-clamp: 2;   /* number of lines to show */
  -webkit-box-orient: vertical;
  overflow: hidden;            /* hides overflowing text */
  text-overflow: ellipsis;     /* adds the "..." */
  white-space: normal; 
  line-height: 2.5rem;        /* allows wrapping */
  min-height: 50px
}

</style>