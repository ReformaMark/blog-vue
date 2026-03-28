<template>
  <v-card class="table-container" outlined>
    
    <!-- Header -->
    <v-card-title class="d-flex justify-space-between align-center">
      <div class="text-h6 font-weight-bold">
        Blogs
      </div>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search blog title, content, author..."
        dense
        solo
        clearable
        hide-details
        style="max-width: 400px"
      ></v-text-field>
    </v-card-title>

    <v-divider></v-divider>

    <!-- Table -->
    <v-data-table
        class="bordered-table"
        :headers="headers"
        :items="blogs"
        :items-per-page="itemsPerPage"
        :page.sync="page"
        :server-items-length="totalItems"
        :loading="loading"
        loading-text="Loading blogs..."
        fixed-header
        height="calc(100vh - 40vh)"
        dense
        @update:page="handlePageChange"
        @update:options="handleOptions"
        @update:items-per-page="handleItemsPerPageChange"
        :footer-props="{
            'items-per-page-options': [10, 20, 50, 100], // remove 'All'
            'items-per-page-text': 'Rows per page'
        }"
    >

        <!-- Loading -->
        <template v-slot:progress>
        <v-progress-linear
            indeterminate
            color="primary"
        ></v-progress-linear>
        </template>
        
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.user="{ item }">
        <div class="d-flex align-center">
            <!-- Optional avatar -->
            <v-avatar size="32" class="mr-2" v-if="item.user.avatar">
            <v-img :src="item.user.avatar"></v-img>
            </v-avatar>
            <!-- User name -->
            <span class="">{{ item.user.name }}</span>
        </div>
        </template>
<!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.image="{ item }">
            <v-container class="">

                <v-img
                :src="item.image || require('@/assets/default.svg')"     
                max-width="100"       
                max-height="60"        
                contain               
                ></v-img>
            </v-container>
        </template>
<!-- eslint-disable-next-line vue/valid-v-slot -->
         <template v-slot:item.blog="{ item }">
            <v-container class="two-line-clamp text-left">
                <v-row no-gutters>
                    <v-col cols="auto" >
                        <p><span class="font-weight-medium">Title:</span> <span class="">{{ item.title }}</span></p>
                    </v-col> 
                   
                </v-row>
                <v-row no-gutters>
                    <v-col cols="auto" >
                        <p class="two-line-clamp"><span class="font-weight-medium">Content:</span> <span class="">{{ item.content }}</span></p>
                    </v-col> 
                </v-row>
                <v-row no-gutters>
                    <v-col cols="auto" >
                        <p class="two-line-clamp"><span class="font-weight-medium">Author:</span> <span class="">{{ item.user.name }}</span></p>
                    </v-col> 
                </v-row>
                <v-row no-gutters>
                    <v-col cols="auto" >
                        <p class="two-line-clamp"><span class="font-weight-medium">Created:</span> <span class="">{{ formatDate(item.created_at)}}</span></p>
                    </v-col> 
                </v-row>
            </v-container>
        </template>
<!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.comments="{ item }">
            <v-container class="d-flex align-center justify-center">
                <v-row>
                    <v-col cols="6">
                        <v-icon small>
                            mdi-message
                        </v-icon>
                    </v-col>
                    <v-col cols="6">
                        <p>{{item.comments_count}}</p>
                    </v-col>
                </v-row>
            </v-container>
        </template>
<!-- eslint-disable-next-line vue/valid-v-slot -->
         <template v-slot:item.actions="{ item }">
            <v-container >
                 <v-icon
                    v-if="item.user.id === getUser.id"
                    medium
                    color="red"
                    @click="openDeleteDialog(item)"
                    >
                    mdi-delete
                </v-icon>
                <v-icon
                    medium
                    color="black"
                    @click="seeItem(item)"
                    class="mx-2"
                >
                    mdi-eye
                </v-icon>
               
            </v-container>
        </template>
      <!-- Empty State -->
      <template v-slot:no-data>
        <div class="text-center pa-5 grey--text">
          <v-icon large class="mb-2">mdi-file-document-outline</v-icon>
          <div>No blogs found</div>
            <create-blog-dialog/>
        </div>
      </template>
    </v-data-table>
    <delete-blog-dialog
        v-model="showDeleteDialog"
        :blog="blog"
    />
  </v-card>
   
</template>
<script>
import { mapActions, mapGetters, mapMutations, mapState} from 'vuex';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import _ from 'lodash'
import DeleteBlogDialog from './DeleteBlogDialog.vue';
import CreateBlogDialog from './CreateBlogDialog.vue';
dayjs.extend(relativeTime)
export default {
    name: "BlogsTable",
    data: () => ({
        search: '',
        showDeleteDialog: false,
        blog: {}
    }),
    components: {
        DeleteBlogDialog,
        CreateBlogDialog
    },
    computed: {
        ...mapGetters('blogsTable', ['optionsState', 'page', 'blogs', 'itemsPerPage' ] ),
        ...mapGetters('user', ['getUser'] ),
        ...mapState('blogsTable', [ 'headers', 'items', 'totalItems', 'loading','sortBy', 'sortDesc' ]),
        page: {
            get() {
                return this.$store.getters['blogsTable/page']
            },
            set(value) {
                this.SET_PAGE(value)
            }
        }
    },
    methods: {
        ...mapActions('blogsTable', ['fetchBlogs']),
        ...mapMutations('blogsTable', ['SET_ITEMS_PER_PAGE', 'SET_OPTIONS', 'SET_PAGE', 'SET_LAST_PAGE']),
        ...mapMutations('blogs', ['SET_SEARCH',]),
        handlePrevNextPage () {
            this.SET_PAGE()
        },
        async handlePageChange(newPage) {
            this.SET_PAGE(newPage)       // Update Vuex page state
            await this.fetchBlogs()      // Fetch new data for that page
        },
        async handleItemsPerPageChange(newItemsPerPage) {
            this.SET_ITEMS_PER_PAGE(newItemsPerPage)
            this.SET_PAGE(1)             // Reset to first page
            await this.fetchBlogs()
        },
        openDeleteDialog(item) {
            this.blog = item,
            this.showDeleteDialog = true
        },
        seeItem(item) {
            this.$router.push(`/blogs/${item.id}`)
        },
        formatDate(date){
          return dayjs(date).fromNow()
        },
        async handleOptions(options) {
            if (!_.isEqual(options, this.optionsState)) {
                this.SET_OPTIONS(options)
                await this.fetchBlogs()
            }
        }
    },
    watch: {
        search: _.debounce(async function (value) {
            if (value === '' && !this.mountedOnce) return
            this.SET_SEARCH(value)
            await this.fetchBlogs()
        }, 1000)
    },
    mounted() {
        this.mountedOnce = true
    }
}
</script>

<style scoped>
    .two-line-clamp {
        display: -webkit-box;
        -webkit-line-clamp: 2;   /* number of lines */
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .title-header {
        font-weight:600;
  
    }
</style>