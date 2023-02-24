<template>
    <div class="page wrapper">
        <h1>Add a Band</h1>
        <div class="divider"></div>
        <TextInput label="band name" inputType="text" placeholder="Band Name" v-model:input="title"
            :error="errors?.title ? errors?.title[0] : ''" />
        <TextInput label="Country of the Band" inputType="text" placeholder="Band Country" v-model:input="location"
            :error="errors?.location ? errors?.location[0] : ''" />
        {{ imageFile?.name }}
        <div class="inputbox">
            <label for="image">
                Upload Image
                <input type="file" hidden id="image" ref="fileInput" @change="handleFileUpload">
            </label>
        </div>
        <TextArea label="description" placeholder="Add an information about this band here"
            v-model:description="description" :error="errors?.description ? errors?.description[0] : ''" />
        <SubmitBtn text="add band" @submit="addBand" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import axios, { AxiosError } from 'axios'
import { useUserStore } from '@/stores/userStore'
import { useBandsStore } from '@/stores/bandsStore'
import TextInput from '@/components/shared/TextInput.vue';
import TextArea from '@/components/shared/TextArea.vue';
import SubmitBtn from '@/components/shared/SubmitBtn.vue'
import Swal from '@/swal'

const userStore = useUserStore()
const bandsStore = useBandsStore()
const router = useRouter()

const title = ref('')
const description = ref('')
const location = ref('')
const image = ref('')
const imageFile = ref()
const fileInput = ref()
const errors = ref<any>([])

const handleFileUpload = () => {
    imageFile.value = fileInput.value.files[0]
}

const getUploadedImage = async () => {
    try {
        const formData = new FormData();
        formData.append('band', imageFile.value);
        const { data } = await axios.post('/api/uploadbandimage', formData, {
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

const addBand = async () => {
    await getUploadedImage()

    if (!image.value) {
        Swal.fire(
            {
                title: 'No  image found!',
                text: 'Please choose an image of your choice and complete all other inputs',
                icon: 'warning',
                background: "rgba(0,0,0,0.5)",
                confirmButtonColor: "#219dff",
            }
        )

        return null
    }
    const data = new FormData();
    data.append('title', title.value || '')
    data.append('location', location.value || '')
    data.append('description', description.value || '')
    if (image.value) {
        data.append('image', image.value || '')
    }
    try {
        await axios.post('api/bands/', data, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        Swal.fire(
            {
                title: 'Band is added!',
                text: 'The band you addedis called "' + title.value + '"',
                icon: 'success',
                background: "rgba(0,0,0,0.5)",
                confirmButtonColor: "#219dff",
            }
        )
        await bandsStore.fetchBandsByUserId()
        router.push('/account/profile/' + userStore._id)
    } catch (error) {
        if (error instanceof AxiosError) {
            errors.value = error.response?.data.errors
        }
    }
}

console.log(bandsStore.bands)
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