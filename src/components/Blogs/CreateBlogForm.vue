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
import { mapActions } from 'vuex'
export default {
    name: 'CreateBlogForm',
    data: () => ({
        title: '',
        content: '',
        rules: {
            required: v => !!v || "Required",
            validContent: v => (v && v.length > 6) || "Content must be more than 6 characters"
        },
        loading: false,
    }),
    methods: {
        ...mapActions('blogs', ['createBlog']),
        submit() {
            if (this.$refs.createBlogForm.validate()) {
                const data = {
                    title: this.title,
                    content: this.content,
                    image: null,
                }
                this.createBlog(data)
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
