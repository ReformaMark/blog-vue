<template>
    <v-container>
     
        <!-- Image -->
        <v-card>
            <v-img
                height="400"
                :src="previewUrl || blog?.image || require('@/assets/default.svg')"
                alt="blog image"
                contain
            ></v-img>
        </v-card>
        <!--Avatar, Name, Created, Action menu-->
        <div class="">
            <v-card-actions class="">
                <div class="">
                    <v-avatar size="40" color="primary" class="mr-3">
                    <span class="white--text">
                        {{ blog?.user?.name?.charAt(0).toUpperCase() }}
                    </span>
                    </v-avatar>
                    {{ blog?.user?.name }}
                    
                </div>
                <v-divider vertical class="mx-10">
                    
                </v-divider>
            
                <div class="d-flex align-center">
                    <v-icon class="mr-2" color="primary darken-1">mdi-calendar</v-icon>
                    <span class="grey--text text--darken-1 text-display-large text-capitalize">
                        {{ formatDate(blog?.created_at) || "" }}
                    </span>
                </div>
                <v-spacer></v-spacer>
                <div class="" v-if="ownedBlog(blog?.user?.id)">
                    <blog-action-menu :blog="blog" />
                </div>
            </v-card-actions>
            <!-- Title and Content -->
            <div v-if="!editing" class="">
                <v-card-title class="text-h2">
                    {{ blog?.title }}
                </v-card-title>
                <v-card-text  >
                    <p class="blog-content">{{ blog?.content }}</p>
                </v-card-text>
            </div>
            <div v-else class="">
                <edit-blog-form/>
            </div>
                
                <v-card-title class="text-h2">
                    
                </v-card-title>
       
        </div>
        <!-- Comment Section... Hidden when editing is true -->
        <v-card v-if="!editing && blog">
            <v-container>
                <comment-input :blogId="blog.id"/>
            </v-container>
            <comment-section :blogId="blog.id"/>
        </v-card>

         
    </v-container>
    <!-- 
     TODOS:
     Image:
     -Hover effect on Image. When clicked editing the image.
     -If the current user is the owner then show the effect(hover)
     Title:
     -when
     NOTE: 
     When submitting supply all fields needed
     -->
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import dayjs from '@/utils/dayjs'
import BlogActionMenu from '@/components/Blogs/BlogActionMenu.vue';
import CommentInput from '@/components/Blogs/CommentInput.vue';
import CommentSection from '@/components/Blogs/CommentSection.vue';
import EditBlogForm from '@/components/Blogs/EditBlogForm.vue';
export default {
    name: "BlogsDetailsView",
    computed: {
        ...mapGetters('blogs', ['blog','editing', 'previewUrl']),
        ...mapGetters('user', ['getUser']),
    },
    mounted() {
        this.setEditing(false)
        if(this.blog === null) {
            this.fetchBlog(this.$route.params.id)
       
            
        }
    },
    methods: {
        ...mapActions('blogs', ['fetchBlog', 'setEditing', 'updateBlog']),
        formatDate(date) {
            return dayjs(date).fromNow()
        },
        ownedBlog (userId) {
            if(this.editing) return false
            if(userId === this.getUser.id) return true;
            return false;
        },
      
   
    },
    components: {
        BlogActionMenu,
        CommentInput,
        CommentSection,
        EditBlogForm,
    }

}
</script>

<style scoped>
    .blog-content {
        line-height: 2.5rem;
        font-size: 24px;
    }

</style>