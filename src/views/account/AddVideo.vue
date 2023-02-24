<template>
    <div class="page wrapper">
        <h1>Add Video</h1>
        <div class="divider"></div>
        <TextInput label="Title" placeholder="Title of Video" v-model:input="title" inputType="text"
            :error="errors?.title ? errors?.title[0] : ''" />
        <TextInput label="Video Url" placeholder="Add a url of a Youtube Video" v-model:input="videoUrl" inputType="text"
            :error="errors?.videoCode ? errors?.videoCode[0] : ''" />
        <SubmitBtn text="add video" @click="addYoutubeVideoLink" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios, { AxiosError } from 'axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore';
import TextInput from '@/components/shared/TextInput.vue'
import SubmitBtn from '@/components/shared/SubmitBtn.vue'
import Swal from '@/swal'

const title = ref('')
const videoUrl = ref('')
const errors = ref<any>([])

const router = useRouter()
const userStore = useUserStore()

const addYoutubeVideoLink = async () => {
    errors.value = []
    try {
        const formData = new FormData()
        formData.append('title', title.value || '')
        formData.append('url', videoUrl.value || '')
        await axios.post('api/video', formData, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        Swal.fire(
            {
                title: 'New video added!',
                text: 'You added a video with the name "' + title.value + '"',
                icon: 'success',
                background: "rgba(0,0,0,0.5)",
                confirmButtonColor: "#219dff",
            }
        )
        router.push('/account/profile/' + userStore._id)
    } catch (error) {
        if (error instanceof AxiosError) {
            errors.value = error.response?.data.errors
        }
    }
}
</script>