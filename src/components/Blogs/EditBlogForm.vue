<template>
    <v-container class="mt-10 edit-form-container">
        <form @submit.prevent="submit">
            <v-text-field
                v-model="title"
                :rules="[requiredRule]"
                color="orange"
                label="Title"
                solo
        
            ></v-text-field>
            <v-textarea
                v-model="content"
                :rules="[requiredRule, validContent]"
                color="orange"
                class="mt-8 "
                label="Content" 
                solo
                value="content"
            ></v-textarea>
            <v-card-actions>
            <v-spacer></v-spacer>
               <v-btn text color="grey darken-1" @click="cancelEdit">
                Cancel
                </v-btn>
                <v-btn color="primary" @click="saveEdit">
                Save
                </v-btn>
        </v-card-actions>
        </form>
        <v-snackbar
            v-model="snackbar"
            :timeout="3000"
            :color="snackbarColor"
            bottom
            right
        >
            {{ snackbarMessage }}
            <v-btn text @click="snackbar = false">Close</v-btn>
        </v-snackbar>

    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { requiredRule, validContent } from '@/composables/useValidation';

export default {
    name: 'EditBlogForm',
    data: () => ({
        snackbar: false,
        snackbarMessage: "",
        snackbarColor: "success",
        validContent,
        requiredRule
    }),
    computed: {
        ...mapGetters('blogs', ['blog', 'editing']),
        title: {
            get() {
            return this.blog.title
            },
            set(value) {
            this.blog.title = value
            }
        },
        content: {
            get() {
            return this.blog.content
            },
            set(value) {
            this.blog.content = value
            }
        }
    },
    methods: {
        ...mapActions('blogs', ['updateBlog', 'setEditing']),
        async handleSubmitForm () {
            const data = {
                blogId: this.blog.id,
                payload: {
                    title: this.title,
                    content: this.content,
                    image:  null // link url of the image
                }
            }
            await this.updateBlog(data)
            this.snackbarMessage = "Update saved successfully."
        },
        cancelEdit () {
            this.setEditing(false)
        },
        async saveEdit () {
            const payload = {
                title: this.title,
                content: this.content,
                image: null
            }
            await this.updateBlog(payload)
            this.snackbarMessage = "Update saved successfully."
            this.snackbarColor = "success"
            this.snackbar = true
            this.setEditing(false)
        }
    }
}
</script>

<style scoped>
    .edit-form-container {
        background-color: transparent;

    }
</style>