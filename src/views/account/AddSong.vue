<template>
    <div class="page wrapper">
        <h1>Add a Song</h1>
        <div class="divider"></div>
        <TextInput label="Song artist" placeholder="Who is an Artist" v-model:input="artist" inputType="text"
            :error="errors?.artist ? errors?.artist[0] : ''" />
        <TextInput label="Song Title" placeholder="Name a New Song" v-model:input="title" inputType="text"
            :error="errors?.title ? errors?.title[0] : ''" />
        <div class="inputbox">
            <label for="image">
                Upload Song
                <input type="file" hidden id="song" ref="fileInput" @change="handleFileUpload">
            </label>
        </div>
        <SubmitBtn @click="addSong" text="add song" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore';
import { useSongStore } from '@/stores/songStore'
import axios, { AxiosError } from 'axios';
import TextInput from '@/components/shared/TextInput.vue'
import SubmitBtn from '@/components/shared/SubmitBtn.vue'
import Swal from '@/swal'

const userStore = useUserStore()
const songStore = useSongStore()
const router = useRouter()

const title = ref('')
const artist = ref('')
const song = ref('')
const songFile = ref('')
const fileInput = ref()
let errors = ref<any>([])

const handleFileUpload = () => {
    songFile.value = fileInput.value.files[0]
}

const getUploadedSong = async () => {
    try {
        const formData = new FormData();
        const file = songFile.value;
        formData.append('song', file);
        const { data } = await axios.post('api/uploadsong', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        song.value = data.url;
    } catch (error) {
        if (error instanceof AxiosError) {
            errors.value = error?.response?.data.errors
        }
    };
}

const addSong = async () => {
    await getUploadedSong();

    if (!song.value) {
        Swal.fire(
            {
                title: 'Opps, something went wrong!',
                text: 'You forgot to upload the mp3 file!',
                icon: 'warning',
                background: "rgba(0,0,0,0.5)",
                confirmButtonColor: "#219dff",
            }
        )
        return null
    }
    try {
        const formData = new FormData()
        formData.append('title', title.value || '')
        formData.append('artist', artist.value || '')
        formData.append('song', song.value)
        await axios.post('api/songs', formData, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        songStore.fetchSongsByUserId()
        setTimeout(() => {
            router.push('/account/profile/' + userStore.id)
        }, 200)
    } catch (error) {
        if (error instanceof AxiosError) {
            errors.value = error.response?.data.errors
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/variables';
.inputbox {
    width: 100%;
    margin: 1rem auto;
    display: flex;
    justify-content: center;

    label:hover {
        color: $blue;
        text-shadow: 0 0 2px $blue;
        cursor: pointer;
    }
}
</style>