<template>
    <div class="page wrapper">
        <h1>Edit Post</h1>
        <div class="divider"></div>
        <TextInput label="band name" inputType="text" placeholder="Band Name" v-model:input="title"
            :error="errors?.title ? errors?.title[0] : ''" />
        <TextInput label="band Country" inputType="text" placeholder="Band Country" v-model:input="location"
            :error="errors?.location ? errors?.location[0] : ''" />
        <CroppedImage v-if="choosedImage" :image="choosedImage" />
        <CroppedImage v-else :image="image ? image : DefaultAvatar" />
        <div class="inputbox">
            <label for="image">
                Upload Image
                <input type="file" hidden id="image" ref="fileInput" @change="handleFileUpload">
            </label>
        </div>
        <TextArea label="description" placeholder="Add more information here" v-model:description="description"
            :error="errors?.description ? errors?.description[0] : ''" />
        <SubmitBtn text="edit band" @submit="updateBand" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useBandsStore } from '@/stores/bandsStore'
import TextInput from '@/components/shared/TextInput.vue';
import TextArea from '@/components/shared/TextArea.vue';
import SubmitBtn from '@/components/shared/SubmitBtn.vue'
import CroppedImage from '@/components/shared/CroppedImage.vue'
import DefaultAvatar from '/src/DefaultUserAvatar.png'
import axios, { AxiosError } from 'axios'
import Swal from '@/swal'

const route = useRoute()
const router = useRouter()
const bandsStore = useBandsStore()
const userStore = useUserStore()

const title = ref('')
const location = ref('')
const description = ref('')
const image = ref('')
const newImage = ref('')
const imageFile = ref<any>()
const choosedImage = ref('')
const fileInput = ref()
const errors = ref<any>([])

onMounted(async () => {
    await getBandById()
})

const handleFileUpload = () => {
    imageFile.value = fileInput.value.files[0]
    choosedImage.value = URL.createObjectURL(imageFile.value)
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
        newImage.value = data.url;
    } catch (error) {
        if (error instanceof AxiosError) {
            errors.value = error?.response?.data.errors
        }
    };
}

const getBandById = async () => {
    try {
        const res = await axios.get('api/bands/' + route.params.id)
        title.value = res.data.title
        location.value = res.data.location
        image.value = bandsStore.bandImage(res.data.image)
        description.value = res.data.description
    } catch (error) {
        if (error instanceof AxiosError) {
            errors.value = error.response?.data.errors
        }
    }
}


const updateBand = async () => {
    if (imageFile.value) {
        await getUploadedImage()
    }
    if (!image.value && !newImage.value) {
        Swal.fire(
            'No  image found!',
            'Please choose an image of your choice and complete all other inputs',
            'warning'
        )
        return null
    }
    let data = new FormData();
    data.append('title', title.value || '')
    data.append('location', location.value || '')
    data.append('description', description.value || '')
    if (newImage.value) {
        data.append('image', newImage.value)
    }
    try {
        await axios.patch('api/bands/' + route.params.id, data, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        Swal.fire(
            {
                title: 'Band is updated!',
                text: 'The band you edited is called "' + title.value + '"',
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
</script>

<style scoped lang="scss">
@import '@/assets/variables';

.login {
    width: 100%;


    &-input {
        width: 90%;
        padding: 0.5rem;
    }

    &-error {
        width: 90%;
        padding: 0.2rem;
        font-size: 0.8rem;
        color: red;
        text-align: left;
    }

    &-button {
        padding: 0.5rem 1rem;
        background: none;
        border: 1px solid #ccc;
        outline: none;
        margin: 2rem auto;
        cursor: pointer;

        &:hover {
            background-color: #ddd;
        }

    }
}

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