<template>
    <v-container>
        <v-row justify="space-between" align-="center" >
            <v-col cols="auto">
                <h2>Create new blog</h2>
            </v-col>
            <v-col cols="auto">
                <v-icon
                color="grey darken-2"
                class="cursor-pointer"
                @click="$emit('close')"
                >
            
                mdi-close
                </v-icon>
            </v-col>
        </v-row>
        <v-form  ref="createBlogForm" lazy-validation @submit.prevent>
            <v-img
                height="400"
                :src="previewUrl || require('@/assets/default.svg')"
                alt="blog image"
                contain
            ></v-img>
            <v-file-input
                v-model="file"
                label="Upload Image"
                show-size
                solo
            ></v-file-input>
            <v-text-field
                v-model="title"
                :rules="[rules.required]"
                label="Title"
                color="orange"
                class="mt-8"
                outlined
            ></v-text-field>
            <v-textarea
                v-model="content"
                :rules="[rules.required, rules.validContent]"
                color="orange"
                class="mt-8"
                label="Content" 
                outlined
            ></v-textarea>
            <v-btn
                type="submit"
                block
                class="py-6 mt-10"
                color="orange"
                @click="submit"
            >
            <span v-if="loading">Loading...</span>
            <span v-else color="white" class="mr-2 white--text">Create</span>
            </v-btn>
        </v-form>
    </v-container>
</template>

<script>
import api from '@/services/api';
import { mapActions } from 'vuex'
export default {
    name: 'CreateBlogForm',
    data: () => ({
        title: '',
        content: '',
        file: null,
        imageUrl: "",
        rules: {
            required: v => !!v || "Required",
            validContent: v => (v && v.length > 6) || "Content must be more than 6 characters"
        },
        loading: false,
    }),

    computed: {
        previewUrl() {
            if (this.file) {
                console.log(this.file)
                return URL.createObjectURL(this.file)
            }
            return null
        },
    },
    methods: {
        ...mapActions('blogs', ['createBlog']),
        async uploadFile() {
            if (!this.file) return

            const formData = new FormData()
            formData.append('image', this.file) 
    
            try {
                const response = await api.post('/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                const url = response.data.url
                console.log('Upload successful, image URL:', url)
                this.imageUrl = url
            } catch (err) {
                console.error('Upload failed:', err)
            }
        },
        async submit() {
            if (this.$refs.createBlogForm.validate()) {
                await this.uploadFile()

            
                const data = {
                    title: this.title,
                    content: this.content,
                    image: this.imageUrl || null,
                }

                console.log('Submitting blog with data:', this.imageUrl)
                await this.createBlog(data)
                this.$emit('close')
                this.$refs.createBlogForm.reset()
                this.title = ''
                this.content = ''
                this.loading = false
            
                return true
            }

            return false
        }
    }
}
</script>
