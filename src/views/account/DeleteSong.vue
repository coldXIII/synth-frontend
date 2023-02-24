<template>
    <div class="page">
        <div class="wrapper">
            <h1>Delete Your Song</h1>
            <div class="divider"></div>
            <div v-for="(song, index) in songStore.songs" :key="song._id" class="songwrapper">
                <div>
                    <h4>{{ song.artist }} - {{ song.title }}</h4>
                </div>
                <button @click="deleteSong(song)">delete song</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import Swal from '@/swal'
import { useSongStore } from '@/stores/songStore'

const songStore = useSongStore()

const deleteSong = async (song: { _id: string; }) => {
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
                await axios.delete('api/songs/' + song._id)
                songStore.fetchSongsByUserId()
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
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

.songwrapper {
    width: 80%;
    padding: 1rem;
    margin-bottom: 0.5rem;
    background-color: #232323;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h4 {
        text-transform: uppercase;
        font-weight: 200;
        font-size: 0.8rem;
        color: $blue;
    }

    button {
        background-color: transparent;
        padding: 0.5rem 1rem;
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