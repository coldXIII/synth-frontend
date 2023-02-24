<template>
    <div class="page">
        <div class="wrapper">
            <h1>Edit Profile</h1>
            <div class="divider"></div>
            <TextInput label="Your New Name" inputType="text" placeholder="Your Name" v-model:input="username"
                :error="errors?.username ? errors?.username[0] : ''" />
            <CroppedImage :image="image ? image : DefaultAvatar" />
            <div class="inputbox">
                <label for="image">
                    Upload Image
                    <input type="file" hidden id="image" ref="fileInput" @change="handleUpload">
                </label>
            </div>
            <SubmitBtn text="update profile" @click="updateUser" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import axios, { AxiosError } from 'axios';
import { useUserStore } from '@/stores/userStore'
import { useProfileStore } from '@/stores/profileStore'
import DefaultAvatar from '/src/DefaultUserAvatar.png'
import TextInput from '@/components/shared/TextInput.vue';
import SubmitBtn from '@/components/shared/SubmitBtn.vue'
import CroppedImage from '@/components/shared/CroppedImage.vue'

const userStore = useUserStore()
const profileStore = useProfileStore()
const router = useRouter()

const username = ref('')
const image = ref('')
const fileInput = ref<any>()
const errors = ref<any>([])

onMounted(() => {
    username.value = profileStore.username || ''
    image.value = profileStore.image || ''
    console.log(profileStore.image)
})

const handleUpload = (event: any) => {
    fileInput.value = event.target.files[0];
}

const getUploadedImage = async () => {
    try {
        const formData = new FormData();
        formData.append('avatar', fileInput.value);
        const { data } = await axios.post('/api/uploadavatar', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        image.value = data.url;
    } catch (error) {
        if (error instanceof AxiosError) {
            errors.value = error?.response?.data.errors
        }
    };
}

const updateUser = async () => {
    await getUploadedImage();
    const data = new FormData();
    data.append('username', username.value || '')
    if (image.value) {
        data.append('avatarUrl', image.value || '')
    }
    try {
        await axios.patch('api/user', data, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        await userStore.fetchUser()
        router.push('/account/profile/' + userStore.id)
    } catch (error) {
        if (error instanceof AxiosError) {
            errors.value = error?.response?.data.errors
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