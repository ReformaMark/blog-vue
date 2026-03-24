<template>
  <div>
    <v-file-input
      v-model="file"
      :rules="rules"
      accept="image/png, image/jpeg, image/bmp"
      label="Photo"
      placeholder="Upload your photo"
      prepend-icon="mdi-camera"
    ></v-file-input>

    <v-btn color="primary" @click="uploadFile" :disabled="loading">
      Upload
    </v-btn>

    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000" bottom right>
      {{ snackbarMessage }}
      <v-btn text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions } from 'vuex';


export default {
  name: 'UploadImage',
  data: () => ({
    file: null,
    loading: false,
    snackbar: false,
    snackbarMessage: '',
    snackbarColor: 'success',
    rules: [
        file => {
            if (!file) return 'You must upload a photo.'
            return true
        },
        file => {
            if (!file) return true
            const f = Array.isArray(file) ? file[0] : file
            return f.size < 2 * 1024 * 1024 || 'File must be less than 2MB.'
        },
        file => {
            if (!file) return true
            const f = Array.isArray(file) ? file[0] : file
            const validTypes = ['image/png', 'image/jpeg', 'image/bmp']
            return validTypes.includes(f.type) || 'Only PNG, JPEG, or BMP images are allowed.'
        }
        ]

  }),
  methods: {
    ...mapActions('blogs', ['uploadPhoto']),
    async uploadFile() {
        if (!this.file) return
        this.loading = true

        const f = Array.isArray(this.file) ? this.file[0] : this.file

        const formData = new FormData()
        formData.append('image', f)
        try {
            await this.uploadPhoto(formData)
            this.snackbarMessage = 'Photo uploaded successfully!'
            this.snackbarColor = 'success'
            this.snackbar = true
            this.file = null
        } catch (error) {
            console.error(error)
            this.snackbarMessage = 'Upload failed. Please try again.'
            this.snackbarColor = 'error'
            this.snackbar = true
        } finally {
            this.loading = false
        }
    }
  }
}
</script>
