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
                            <div class="mx-2">
                                <span  v-if="isEdited(comment)" class=" grey--text text--darken-1 text-caption">
                                    (edited)
                                </span>
                            </div>
                          
                        </v-col>
                        <v-col v-if="ownComment(comment?.user?.id)" cols="2" align="end" >
                            <comment-action-menu :comment="comment"  @edit="startEdit"/>
                        </v-col>
                    
                    </v-row>

                    </v-card-title>

                    <v-card-text v-if="editingCommentId !== comment.id">
                        {{ comment.content }}
                    </v-card-text>

                    <v-row v-else>
                        <v-col>
                            <v-text-field
                            v-model="editingContent"
                            label="Edit comment"
                            />
                        </v-col>

                        <v-col cols="auto">
                            <v-btn small color="primary" @click="saveEdit(comment)">
                            Save
                            </v-btn>

                            <v-btn small text @click="cancelEdit">
                            Cancel
                            </v-btn>
                        </v-col>
                    </v-row>
                </div>
                <div v-if="comment.deleted" class="">
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
                    </v-row>

                    </v-card-title>

                    <v-card-text>
                        <v-alert
                            v-if="comment.deleted"
                            type="error"
                            dense
                            outlined
                            class="text-center my-2"
                        >
                            This comment was deleted by the user.
                        </v-alert>
                    </v-card-text>
                </div>
             
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
import { mapActions, mapGetters, mapMutations } from 'vuex';
import CommentActionMenu from '../Comments/CommentActionMenu.vue';

export default {
    name: 'CommentSection',
    props: {
        blogId: { type: Number, required: true }
    },
    data: () => ({
        editingCommentId: null,
        editingContent: ''
    }), 
    components: { CommentActionMenu },
    computed: {
        ...mapGetters('comments', ['comments', 'paginationStats', 'isEditing' ]),
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
        content: {
            get() {
                return this.blog.comment
            },
            set(value) {
                this.blog.content = value
            }
        },
    
    },
    methods: {
        ...mapActions('comments', ['fetchComments', 'loadMoreComments', 'updateComment']),
        ...mapMutations('comments', ['SET_EDITING_COMMENT']),
        formatDate(date) {
            return dayjs(date).fromNow()
        },
        async handleLoadMore () {
            this.loadMoreComments(this.blogId)
        },
        ownComment(userId) {
            return userId === this.getUser.id
        },
        handleCancelUpdate(){
            this.SET_EDITING_COMMENT(false)
        },
        startEdit(comment) {
            this.editingCommentId = comment.id
            this.editingContent = comment.content
        },
        async saveEdit(comment) {
            await this.updateComment({
                commentId: comment.id,
                content: this.editingContent
            })

            this.editingCommentId = null
        },
        cancelEdit() {
            this.editingCommentId =  null,
            this.editingContent = ''
        },
        isEdited(comment) {
            return comment.updated_at && comment.updated_at !== comment.created_at;
        },

    },
    mounted() {
        this.fetchComments({ blogId: this.blogId});
    }   
}
</script>