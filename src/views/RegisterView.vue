<template>
    <div class="page wrapper">
        <h1>Register</h1>
        <TextInput label="name" inputType="text" placeholder="Your Name" v-model:input="username"
            :error="errors?.username ? errors?.username[0] : ''" />
        <TextInput label="email" inputType="text" placeholder="Your Email" v-model:input="email"
            :error="errors?.email ? errors?.email[0] : ''" />
        <TextInput label="password" inputType="password" placeholder="Your Password" v-model:input="password"
            :error="errors?.password ? errors?.password[0] : ''" />
        <TextInput label="Confirm Password" inputType="password" placeholder="Confirm Your Password"
            v-model:input="confirmPassword"
            :error="confirmPassword && confirmPassword !== password ? 'Passwords are not matching' : undefined" />
        <button @click="register" class="form-button">Register</button>
        <RouterLink to="/login">Already have an account? <span class="login-link">Login!</span></RouterLink>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios, { AxiosError } from 'axios'
import { useRouter, RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useProfileStore } from '@/stores/profileStore'
import { useSongStore } from '@/stores/songStore'
import { useVideoStore } from '@/stores/videoStore'
import { useBandsStore } from '@/stores/bandsStore'
import TextInput from '@/components/shared/TextInput.vue';

const router = useRouter()
const userStore = useUserStore()
const profileStore = useProfileStore()
const songStore = useSongStore()
const videoStore = useVideoStore()
const bandsStore = useBandsStore()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errors = ref<any>([])

const register = async () => {
    try {
        const response = await axios.post('/api/user/register', {
            username: username.value,
            email: email.value,
            password: password.value
        })
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
        console.log('Response:', response.data)
        userStore.setUserDetails(response)
        await profileStore.fetchProfileById()
        await songStore.fetchSongsByUserId()
        await bandsStore.fetchBandsByUserId()
        await videoStore.fetchVideosByUserId()
        router.push('/account/profile/' + userStore.id)
    } catch (error) {
        if (error instanceof AxiosError) {
            errors.value = error.response?.data.errors
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/variables';




.form-button {
    padding: 0.5rem 2.5rem;
    background: none;
    border: 1px solid #ccc;
    color: #fff;
    text-transform: uppercase;
    font-size: 1rem;
    outline: none;
    margin: 2rem auto;
    cursor: pointer;

    &:hover {
        box-shadow: 2px 2px 5px $green, -2px -2px 5px $green;
        border: 1px solid $green;
        color: $green;
    }

    @media screen and (max-width:450px) {
        font-size: 0.8rem;
    }
}


.login-link:hover {
    color: $blue;
    text-shadow: 2px 2px 5px $blue, -2px -2px 5px $blue;
}
</style>