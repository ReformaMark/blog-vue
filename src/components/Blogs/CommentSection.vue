<template>
    <v-container>
        <h3>Comments</h3>
        <v-container v-if="hasComments">
            <v-card  v-for="comment in comments" :key="comment.id">
                <v-img
                    height="400"
                    :src="blog.image || require('@/assets/default.svg')"
                    alt="blog image"
                    cover
                ></v-img>
            </v-card>
        </v-container>
        <v-container v-else class="text-center py-4">
            <p class="text-subtitle-1 grey--text">
                No comments yet. Be the first to share your thoughts!
            </p>
        </v-container>

    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'CommentSection',
    props: {
        blogId: { type: Number, required: true }
    },

    computed: {
        ...mapGetters('comments', ['comments']),

        hasComments () {
            if(this.comment.lenght >= 1) return true
            return false
        }
    },

    methods: {
        ...mapActions('comments', ['fetchComments'])
    },
    mounted() {
     this.fetchComments({ blogId: this.blogId });
    }   
}
</script>