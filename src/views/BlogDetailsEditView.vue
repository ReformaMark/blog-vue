<template>
    <v-container>

        <upload-image/>
    </v-container>
</template>
<script>
import UploadImage from '@/components/Blogs/UploadImage.vue';

export default {
    name: 'BlogDetailsEditView',
    components: {
        UploadImage,
    }
}
</script>