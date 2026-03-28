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
        label="Search blog title..."
        dense
        solo
        clearable
        hide-details
        style="max-width: 300px"
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
      @update:items-per-page="handleItemsPerPageChange"
    >

        <!-- Loading -->
        <template v-slot:progress>
        <v-progress-linear
            indeterminate
            color="primary"
        ></v-progress-linear>
        </template>
<!-- eslint-disable-next-line vue/valid-v-slot -->
         <template v-slot:item.content="{ item }">
            <div class="two-line-clamp">
            {{ item.content }}
            </div>
        </template>
<!-- eslint-disable-next-line vue/valid-v-slot -->
         <template v-slot:item.actions="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                small
                @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
        </template>

      <!-- Empty State -->
      <template v-slot:no-data>
        <div class="text-center pa-5 grey--text">
          <v-icon large class="mb-2">mdi-file-document-outline</v-icon>
          <div>No blogs found</div>
        </div>
      </template>

    </v-data-table>

  </v-card>
</template>
<script>
import { mapActions, mapGetters, mapMutations, mapState} from 'vuex';
import _ from 'lodash'
export default {
    name: "BlogsTable",
    data: () => ({
        search: '',
    }),
    computed: {
        ...mapGetters('blogsTable', ['optionsState', 'page', 'blogs', 'itemsPerPage' ] ),
        ...mapState('blogsTable', [ 'headers', 'items', 'totalItems', 'loading','sortBy', 'sortDesc' ]),
        page: {
            get() {
                return this.$store.getters['blogsTable/page']
            },
            set(value) {
                this.SET_SEARCH(value)
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
            console.log("this is the new page:", newPage)
            this.SET_PAGE(newPage)       // Update Vuex page state
            await this.fetchBlogs()      // Fetch new data for that page
        },
        async handleItemsPerPageChange(newItemsPerPage) {
            this.SET_ITEMS_PER_PAGE(newItemsPerPage)
            this.SET_PAGE(1)             // Reset to first page
            await this.fetchBlogs()
        }
    },
    watch: {
        search: _.debounce(async function (value) {
            this.SET_SEARCH(value)

            await this.fetchBlogs()
        }, 1000), // 1sec
    },
    mounted() {
        //fetch the first page here
        this.fetchBlogs()
    }
}
</script>

<style scoped>
    .two-line-clamp {
        display: -webkit-box;
        -webkit-line-clamp: 3;   /* number of lines */
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>