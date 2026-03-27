<template>
  <div class="px-16 pa-10"> 
    <v-row justify="space-between" >
       
        <v-col cols="auto">
          <v-select 
            v-model="selectedView"
            :items="viewOptions"
            label="Select View"
            dense
            solo
          ></v-select>
        </v-col>
        <v-col cols="auto" >
            <create-blog-dialog/>
        </v-col>
    </v-row>
    <!-- Blog Card view list -->
     <div v-if="selectedView === 'Card'" class="">
       <v-col cols="auto">
            <h2>Blogs ({{ paginationStats.total }})</h2>
          
        </v-col>
      <v-row  gap="20">
      <v-col
        v-for="blog in blogs"
        :key="blog.id"
        cols="12"
        sm="12"
        md="6"
        class="pb-4"
      >
      <v-card elevation="2" class="ma-2">
        <v-img
          height="250"
          :src="blog.image || require('@/assets/default.svg')"
          alt="blog image"
          contain
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
            <v-btn @click="handleViewBlog(blog)" dark>
              View Blog
            </v-btn>
          </v-card-subtitle>
      </v-card-actions>
      </v-card>
      </v-col>
      </v-row>
      <v-container class="text-center my-4">
          <v-btn
              v-if="hasNextPage"
              @click="handleLoadMore"
              color="primary"
              outlined
              rounded
          >
              <v-icon left>mdi-arrow-down</v-icon>
              Load more blogs
          </v-btn>
          <!-- Only show "end of comments" if there are comments -->
          <p
              v-else-if="hasBlogs"
              class="mt-3 text-center grey--text"
          >
              You&apos;ve reached the end — no more blogs to show.
          </p>
      </v-container>
    </div>
    <div v-else-if="selectedView === 'Table'" class="">
      <blogs-table/>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { mapActions, mapGetters } from 'vuex';
import CreateBlogDialog from './CreateBlogDialog.vue';
import BlogsTable from './BlogsTable.vue';
dayjs.extend(relativeTime)
export default {
    name: 'BlogsList',
    data: () => ({
      selectedView: 'Table', // must be a value inside the viewOptions ex. "Card", "Table", "List"
      viewOptions: ["Card", "Table", "List"]
    }),
    components: {
      CreateBlogDialog,
      BlogsTable,
    },
    computed: {
        ...mapGetters('blogs', ['blogs', 'paginationStats']),
        ...mapGetters('user', ['getUser']),
        hasBlogs () {
            if(this.blogs.length >= 1) return true
            return false
        },
        hasNextPage() {
            if (!this.paginationStats) return false;
            return this.paginationStats.current_page < this.paginationStats.last_page;
        },
    },
    methods: {
        ...mapActions('blogs', ['fetchBlogs', 'setBlog', 'loadMoreBlogs']),
        formatDate(date){
          return dayjs(date).fromNow()
        },
        handleViewBlog(blog){
          this.setBlog(blog)
   
          this.$router.push({ name: 'blog-details', params: { id: blog.id } })
        },
        async handleLoadMore () {
            this.loadMoreBlogs()
        },
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
.fixed-dialog {
  position: fixed;
  bottom: 16px;   /* distance from bottom */
  right: 16px;    /* distance from right */
  z-index: 2000;  /* make sure it stays above other content */
}
</style>