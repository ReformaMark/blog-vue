<template>
  <div class="px-16 pa-10"> 
    <v-row justify="space-between" align="center" class="mb-4">
      <!-- View Selector -->
      <v-col cols="auto">
        <v-select
          v-model="selectedView"
          :items="viewOptions"
          label="Select View"
          dense
          solo
          hide-details
          outlined
          style="min-width: 180px;"
        ></v-select>
      </v-col>

      <!-- Create Blog Button -->
      <v-col cols="auto">
        <create-blog-dialog>
          <template #activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="ma-0"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left>mdi-plus</v-icon>
              Create Blog
            </v-btn>
          </template>
        </create-blog-dialog>
      </v-col>
    </v-row>
    <!-- Blog Card view list -->
     <div v-if="selectedView === 'Card'" class="">

      <!-- Totals and search input -->
      <v-row>
       <v-col cols="6">
            <h2>Blogs ({{ paginationStats.total }})</h2>
         
        </v-col>
       <v-col align="end" cols="6" >
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search blog title, content, author..."
              dense
              solo
              clearable
              hide-details
              style="max-width: 400px"
              class="ml-auto"
            ></v-text-field>
         
        </v-col>
      </v-row>
      <v-row v-if="search">
        <v-col>
          Search: "{{ this.search }}"
        </v-col>
      </v-row>
      <!-- BLOGS CONTENTS -->
    
      <v-row  gap="20">
        <transition-group
          name="stagger-slide"
          tag="v-row"
          class="d-flex flex-wrap"
          :css="false"
          @before-enter="beforeEnter"
          @enter="enter"
        >
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
        </transition-group>
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


      <!-- No blogs found -->
      <v-slide-y-transition>
        <v-row 
            v-if="blogs.length < 1" 
            class="justify-center align-center" 
            style="min-height: 300px;"
          >
            <v-col
              class="text-center"
              cols="12"
              sm="8"
              md="6"
            >
              <v-icon 
                large 
                color="grey lighten-1" 
                style="font-size: 64px;"
              >
                mdi-file-document-outline
              </v-icon>
              <h2 class="font-weight-light my-3" style="color: #757575;">
                No Blogs Found
              </h2>
              <p class="subtitle-1" style="color: #9e9e9e;">
                Looks like there’s nothing here yet. Try creating a new blog or refresh the page.
              </p>
                <create-blog-dialog/>
            </v-col>
        </v-row>
      </v-slide-y-transition>
    </div>
    <div v-else-if="selectedView === 'Table'" class="">
      <blogs-table/>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { mapActions, mapGetters, mapMutations } from 'vuex';
import CreateBlogDialog from './CreateBlogDialog.vue';
import BlogsTable from './BlogsTable.vue';
import _ from 'lodash';
dayjs.extend(relativeTime)
export default {
    name: 'BlogsList',
    data: () => ({
      viewOptions: ["Card", "Table", "List"],
      search: ""
    }),
    components: {
      CreateBlogDialog,
      BlogsTable,
    },
    computed: {
        ...mapGetters('blogs', ['blogs', 'paginationStats',]),
        ...mapGetters('user', ['getUser']),
        hasBlogs () {
            if(this.blogs.length >= 1) return true
            return false
        },
        hasNextPage() {
            if (!this.paginationStats) return false;
            return this.paginationStats.current_page < this.paginationStats.last_page;
        },
        selectedView: {
            get() {
                return this.$store.getters['blogs/selectedView']
            },
            set(value) {
                this.SET_SELECTED_VIEW(value)
            }
        }

    },
    methods: {
        ...mapMutations('blogs', ['SET_SELECTED_VIEW']),
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

        beforeEnter(el) {
          el.style.opacity = 0;
          el.style.transform = 'translateY(30px)';
        },
        enter(el, done) {
          const delay = el.dataset.index * 100; // stagger by 100ms
          setTimeout(() => {
            el.style.transition = 'all 0.4s ease';
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
            done();
          }, delay);
        },
    },
    mounted() {
        this.fetchBlogs()

    },
    watch: {
        search: _.debounce(async function (value) {
            this.search = value
            await this.fetchBlogs(this.search)
        }, 1000), // 1sec
    },


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