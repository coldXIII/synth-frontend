<template>
    <div class="player-wrapper">
        <div id="aplayer"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import type { Song, NewSong } from '@/types'
import { useTopSongsStore } from '@/stores/topSongsStore'
import APlayer from 'aplayer'
import 'aplayer/dist/APlayer.min.css';

const songStore = useTopSongsStore()
const songsList = <NewSong[]>[]

onMounted(() => {
    setTimeout(() => { mapSongs() }, 500)
})

const mapSongs = () => {
    let newSongs = songStore.songs.map(function (song: Song) {
        return {
            name: song.title,
            artist: song.artist,
            url: import.meta.env.VITE_APP_API_URL + song.song
        }
    })
    for (let i = 0; i < newSongs.length; i++) {
        songsList.push(newSongs[i])
    }
    thePlayer()
}

const thePlayer = () => {
    new APlayer({
        container: document.getElementById('aplayer'),
        audio: songsList,
    });
}
</script>

<style scoped lang="scss">
@import '@/assets/variables';

.player-wrapper {
    width: 100%;
    padding: 1rem;

    #aplayer {
        background-color: #000;
        width: 70%;
        margin: 1rem auto;
        border-radius: 5px;
        box-shadow: 0px 0px 5px $blue, 0px 0px 10px $blue, 0px 0px 20px $blue;

        @media screen and (max-width:850px) {
            width: 80%;
        }

        @media screen and (max-width:450px) {
            width: 90%;
        }
    }
}
</style>