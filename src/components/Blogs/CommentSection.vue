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
                <v-card-title class="d-flex justify-space-between align-center">
                <div>
                    <strong>{{ comment.user.name }}</strong>
                    <span class="grey--text text--darken-1 ml-2">
                    • {{formatDate(comment.created_at) }}
                    </span>
                </div>
                </v-card-title>

                <v-card-text>
                {{ comment.content }}
                </v-card-text>
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

            <p
                v-else
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

export default {
    name: 'CommentSection',
    props: {
        blogId: { type: Number, required: true }
    },
    computed: {
        ...mapGetters('comments', ['comments', 'paginationStats']),

        hasComments () {
            if(this.comments.length >= 1) return true
            return false
        },
        hasNextPage() {
            if (!this.paginationStats) return false;
            return this.paginationStats.current_page < this.paginationStats.last_page;
        }
    },
    methods: {
        ...mapActions('comments', ['fetchComments', 'loadMoreComments']),
        formatDate(date) {
            return dayjs(date).fromNow()
        },
        async handleLoadMore () {
            this.loadMoreComments(this.blogId)
        }
    },
    mounted() {
        this.fetchComments({ blogId: this.blogId});
    }   
}
</script>