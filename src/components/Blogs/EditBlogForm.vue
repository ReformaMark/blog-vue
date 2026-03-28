<template>
    <v-container class="mt-10 edit-form-container">
        <form >
            
            <v-file-input
                v-model="file"
                label="Upload Image"
                show-size
                :disabled="disable"
                solo
            ></v-file-input>

            <v-text-field
                v-model="title"
                :rules="[requiredRule]"
                color="orange"

                label="Title"
                :disabled="disable"
                autofocus
            ></v-text-field>
            <v-textarea
                v-model="content"
                :rules="[requiredRule, validContent]"
                color="orange"
                class="mt-8 "
                label="Content" 
                :disabled="disable"
                solo
                value="content"
            ></v-textarea>
          
        </form>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn type="button" text color="grey darken-1"    :disabled="disable" @click="cancelEdit">Cancel</v-btn>
            <v-btn type="button" color="primary"    :disabled="disable" @click="saveEdit">Save</v-btn>
        </v-card-actions>
        <v-snackbar
            v-model="snackbar"
            :timeout="1000"
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
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { requiredRule, validContent } from '@/composables/useValidation';
import api from '@/services/api';

export default {
    name: 'EditBlogForm',
    data: () => ({
        file: null,
        imageUrl: "",
        disable: false,
        snackbar: false,
        snackbarMessage: "Editing mode",
        snackbarColor: "info",
        validContent,
        requiredRule
    }),
    computed: {
        ...mapGetters('blogs', ['blog', 'editing', 'previewUrl']),
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
    watch: {
        file(newFile) {
            if (newFile) {
            this.setPreviewUrl(newFile)
            } else {
                this.setPreviewUrl = null
            }
        }
    },
    methods: {
        ...mapActions('blogs', ['updateBlog', 'setEditing', 'setPreviewUrl']),
        ...mapMutations('blogs', ['UPDATE_BLOG_IMAGE']),
        cancelEdit () {
            this.setEditing(false)
        },
        async uploadFile() {
            if (!this.file) return

            const formData = new FormData()
            formData.append('image', this.file) 
            formData.append('blog_id', this.blog.id) 
    
            try {
                const response = await api.post('/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })

                const url = response.data.url
                this.imageUrl = url
          
            } catch (err) {
                console.error('Upload failed:', err)
            }
        },
        showSnackBar(show, mes, color) {
            this.snackbarMessage = mes
            this.snackbarColor = color
            this.snackbar = show
        },
        async saveEdit () {
            this.disable = true
            try {
                await this.uploadFile()
            } catch (error) {
                console.log("Something went wrong in uploading image:", error )
                throw error
            }
            const payload = {
                blogId: this.blog.id,
                data: {
                    title: this.title,
                    content: this.content,
                    image: this.imageUrl
                }
            }
            await this.updateBlog(payload)
            this.showSnackBar(true, "Update saved successfully.", "success" )
            setTimeout(() => {
                this.setEditing(false)
                this.disable = false
            }, 1000)
        }
    }
}
</script>

<style scoped>
    .edit-form-container {
        background-color: transparent;

    }
</style>