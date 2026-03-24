<template>
    <v-container>
        <v-card>
            <v-img
                height="400"
                :src="blog?.image || require('@/assets/default.svg')"
                alt="blog image"
                cover
            ></v-img>
        </v-card>
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
                        {{ formatDate(blog.created_at) || "" }}
                    </span>
                </div>
                <v-spacer></v-spacer>
                <div class="" v-if="ownedBlog(blog?.user?.id)">
                    <blog-action-menu :blog="blog" />
                </div>
            </v-card-actions>
            <v-card-title class="text-h2">
                {{ blog.title }}
            </v-card-title>
            <v-card-text >
                <p class="blog-content">{{ blog.content }}</p>
            </v-card-text>
            <v-card>

            </v-card>
        </div>
        <v-card>
            <v-container>
                <comment-input :blogId="blog.id"/>
            </v-container>
            <comment-section :blogId="blog.id"/>
        </v-card>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import dayjs from '@/utils/dayjs'
import BlogActionMenu from '@/components/Blogs/BlogActionMenu.vue';
import CommentInput from '@/components/Blogs/CommentInput.vue';
import CommentSection from '@/components/Blogs/CommentSection.vue';
export default {
    name: "BlogsDetailsView",
    computed: {
        ...mapGetters('blogs', ['blog']),
        ...mapGetters('user', ['getUser']),
    },
    mounted () {
        if(this.blog === null) {
            this.$router.push('/blogs')
        }
    },
    methods: {
        formatDate(date) {
            return dayjs(date).fromNow()
        },
        ownedBlog (userId) {
            console.log(userId === this.getUser.id)
            if(userId === this.getUser.id) return true;
            return false;
        }   
    },
    components: {
        BlogActionMenu,
        CommentInput,
        CommentSection
    }

}
</script>

<style scoped>
    .blog-content {
        line-height: 2.5rem;
        font-size: 24px;
    }

</style>