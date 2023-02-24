<template>
    <div class="profile-header">
        <div class="logo">
            Synth
        </div>
        <div v-if="!profileStore._id">
            <router-link to="/login" class="login">
                Login
            </router-link>
        </div>
        <div v-else class="profile">
            <router-link :to="'/account/profile/' + profileStore._id" class="login">
                Go to Profile
            </router-link>
            <LinkBtn text="LogOut" :danger="true" style="margin-right: 2rem" @click="logOut" />
            <div class="avatar-wrapper">
                <div class="avatar">
                    <img :src="profileStore.image" width="20" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore'
import { useProfileStore } from '@/stores/profileStore'
import { useSongStore } from '@/stores/songStore'
import { useVideoStore } from '@/stores/videoStore'
import { useRouter } from 'vue-router';
import LinkBtn from "@/components/shared/LinkBtn.vue";

const router = useRouter()
const userStore = useUserStore()
const profileStore = useProfileStore()
const songStore = useSongStore()
const videoStore = useVideoStore()

onMounted(() => {
    profileStore.fetchProfileById()
})


const logOut = async () => {
    try {
        if (window.confirm('Do you really want to log out?')) {
            userStore.clearUser()
            profileStore.clearProfile()
            songStore.clearSongs()
            videoStore.clearVideos()
            window.localStorage.removeItem('token');
            router.push('/')
        }
    } catch (error) {
        console.log(error)
    }
}


</script>

<style scoped lang="scss">
@import '@/assets/variables';

.profile-header {
    width: 90%;
    margin: 1rem auto;
    padding: 1rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #131313;
    box-shadow: 0 0 5px $blue;

    @media screen and (max-width:550px) {
        flex-direction: column;
    }

    .logo {
        font-size: 3rem;
        font-style: italic;
        text-shadow: $text-shadow-main;
    }

    .login {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.5rem 1rem;
        background-color: transparent;
        border: 1px solid $blue;
        color: $blue;
        border-radius: 5px;
        transition: all 0.2s ease-in-out;
        white-space: nowrap;

        &:hover {
            box-shadow: 2px 2px 5px $blue, -2px -2px 5px $blue;
        }

        @media screen and (max-width:450px) {
            font-size: 0.8rem;
        }
    }

    .profile {
        padding: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;


        .avatar-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 1rem;


            .avatar {
                width: 4rem;
                height: 4rem;
                border-radius: 100%;


                img {
                    width: 100%;
                    border-radius: 100%;
                }
            }

            .author {
                font-size: 1rem;
                text-transform: capitalize;

            }

        }
    }
}
</style>