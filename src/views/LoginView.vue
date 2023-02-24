<template>
    <div class="page wrapper">
        <h1>Login</h1>
        <TextInput label="email" inputType="text" placeholder="Your Email" v-model:input="email"
            :error="errors?.email ? errors?.email[0] : ''" />
        <TextInput label="password" inputType="password" placeholder="Your Password" v-model:input="password"
            :error="errors?.password ? errors?.password[0] : ''" />
        <button @click="login" class="form-button">login</button>
        <RouterLink to="/register">Do not have an account? <span class="register-link">Register!</span></RouterLink>
    </div>
</template>

<script setup lang="ts" >
import { ref } from 'vue';
import axios, { AxiosError } from 'axios'
import { useRouter, RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useProfileStore } from '@/stores/profileStore'
import { useSongStore } from '@/stores/songStore'
import { useVideoStore } from '@/stores/videoStore'
import { useBandsStore } from '@/stores/bandsStore'
import TextInput from '@/components/shared/TextInput.vue';

const email = ref('')
const password = ref('')
const errors = ref<any>([])

const router = useRouter()
const userStore = useUserStore()
const profileStore = useProfileStore()
const songStore = useSongStore()
const videoStore = useVideoStore()
const bandsStore = useBandsStore()

const login = async () => {
    errors.value = []
    try {
        const res = await axios.post('api/user/login', {
            email: email.value,
            password: password.value,
        })
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token
        userStore.setUserDetails(res)
        await profileStore.fetchProfileById()
        await songStore.fetchSongsByUserId()
        await bandsStore.fetchBandsByUserId()
        await videoStore.fetchVideosByUserId()
        router.push('/account/profile/' + userStore._id)
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


.register-link:hover {
    color: $blue;
    text-shadow: 2px 2px 5px $blue, -2px -2px 5px $blue;
}




.error:hover {
    box-shadow: 2px 2px 5px red, -2px -2px 5px red;
    border: 1px solid red;
    color: red;
}
</style>