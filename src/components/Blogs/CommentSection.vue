<template>
    <v-container>
        <h3>Comments({{ paginationStats?.total }})</h3>
        <v-container v-if="hasComments">
            <v-card
                v-for="comment in comments"
                :key="comment.id"
                class="mb-3"
                outlined
            >
                <div v-if="!comment.deleted" class="">
                    <v-card-title class="d-flex justify-space-between align-center">
                    <v-row align="center" justify="space-between" class="mb-2">
                        <!-- Left side: avatar + name + date -->
                        <v-col align="center" cols="10" class="d-flex" no-gutters>
                            <v-avatar size="36" class="mr-2">
                            <v-img v-if="comment.user.avatar" :src="comment.user.avatar" />
                            <span v-else>{{ comment.user.name.charAt(0) }}</span>
                            </v-avatar>

                            <div>
                            <strong>{{ comment.user.name }}</strong>
                            <span class="grey--text text--darken-1 ml-2">
                                {{ formatDate(comment.created_at) }}
                            </span>
                            </div>
                          
                        </v-col>
                        <v-col v-if="ownComment(comment?.user?.id)" cols="2" align="end" >
                            <comment-action-menu :comment="comment"/>
                        </v-col>
                    
                    </v-row>

                    </v-card-title>

                    <v-card-text>
                    {{ comment.content }}
                    </v-card-text>
                </div>
               <v-alert
                    v-if="comment.deleted"
                    type="error"
                    dense
                    outlined
                    class="text-center my-2"
                >
                This comment was deleted by the user.
                </v-alert>

            </v-card>
            
            </v-container>

        <v-container v-else class="text-center py-4">
            <p class="text-subtitle-1 grey--text">
                No comments yet. Be the first to share your thoughts!
            </p>
        </v-container>
       <v-container class="text-center my-4">
            <v-btn
                v-if="hasNextPage"
                @click="handleLoadMore"
                color="primary"
                outlined
                rounded
            >
                <v-icon left>mdi-arrow-down</v-icon>
                Load more comments
            </v-btn>

            <!-- Only show "end of comments" if there are comments -->
            <p
                v-else-if="hasComments"
                class="mt-3 text-center grey--text"
            >
                🎉 You&apos;ve reached the end — no more comments to show.
            </p>
        </v-container>
    </v-container>
</template>

<script>
import dayjs from 'dayjs';
import { mapActions, mapGetters } from 'vuex';
import CommentActionMenu from '../Comments/CommentActionMenu.vue';

export default {
    name: 'CommentSection',
    props: {
        blogId: { type: Number, required: true }
    },
    components: { CommentActionMenu },
    computed: {
        ...mapGetters('comments', ['comments', 'paginationStats']),
        ...mapGetters('user', ['getUser']),

        hasComments () {
            if(this.comments.length >= 1) return true
            return false
        },
        hasNextPage() {
            if (!this.paginationStats) return false;
            return this.paginationStats.current_page < this.paginationStats.last_page;
        },
        totalComments() {
            return this.comments.filter(c => !c.deleted).length
        },
    },
    methods: {
        ...mapActions('comments', ['fetchComments', 'loadMoreComments']),
        formatDate(date) {
            return dayjs(date).fromNow()
        },
        async handleLoadMore () {
            this.loadMoreComments(this.blogId)
        },
        ownComment(userId) {
            return userId === this.getUser.id
        },
    },
    mounted() {
        this.fetchComments({ blogId: this.blogId});
    }   
}
</script>