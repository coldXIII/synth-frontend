<template>
    <div class="page">
        <div class="wrapper">
            <h1>Delete Video</h1>
            <div class="divider"></div>
            <div v-for="(video) in videoStore.videos" :key="video._id" class="videowrapper">
                <div class="title">
                    <iframe class="w-full h-20" :src="replaceUrl(video.url)"></iframe>
                    <h4>{{ video.title }}</h4>
                </div>
                <button @click="deleteVideo(video)">delete video</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import Swal from '@/swal'
import { useVideoStore } from '@/stores/videoStore'

const videoStore = useVideoStore()

const replaceUrl = (url: string): string => {
    return url.replace("watch?v=", "embed/");
}

const deleteVideo = async (video: { _id: string; }) => {
    Swal.fire({
        title: 'Are you sure you want to delete this?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        background: "rgba(0,0,0,0.5)",
        showCancelButton: true,
        confirmButtonText: 'Yes, please!',
        confirmButtonColor: '#29fd53',
        cancelButtonColor: 'red',
    }).then(async (result: { isConfirmed: any; }) => {
        if (result.isConfirmed) {
            try {
                await axios.delete('api/video/' + video._id)
                videoStore.fetchVideosByUserId()
                Swal.fire(
                    {
                        title: 'Deleted!',
                        text: 'Your video has been deleted.',
                        icon: 'success',
                        background: "rgba(0,0,0,0.5)",
                        confirmButtonColor: "#219dff",
                    }
                )
            } catch (err) {
                console.log(err)
            }
        }
    })
}
</script>

<style scoped lang="scss">
@import '@/assets/variables';

.videowrapper {
    width: 80%;
    padding: 1rem 2rem;
    margin-bottom: 0.5rem;
    background-color: #232323;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        flex-direction: column;
    }

    h4 {
        text-transform: uppercase;
        font-weight: 200;
        font-size: 0.8rem;
        color: $blue;
    }

    button {
        background-color: transparent;
        padding: 0.8rem 1.5rem;
        border: 1px solid #fff;
        color: #fff;
        text-transform: uppercase;
        transition: all 0.3s ease;
        cursor: pointer;

        &:hover {
            color: $red;
            border: 1px solid $red;
            color: $red;
            box-shadow: 0 0 5px $red;
        }
    }
}
</style>