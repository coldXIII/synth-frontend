<template>
    <div class="page wrapper">
        <div class="posts-wrapper">
            <div class="card">
                <div class="image">
                    <img :src="bandsStore.bandImage(band.image)" alt="" />
                </div>
                <div class="post-content">
                    <h3>{{ band.title }}</h3>
                    <span>{{ band.location }}</span>
                    <p>
                        {{ band.description }}
                    </p>
                </div>
                <div class="footer">
                    <router-link class="link" to="/bands">Back to the Bands Page</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import { useBandsStore } from '@/stores/bandsStore';
const route = useRoute()
const bandsStore = useBandsStore()
const band = ref<any>([])

onMounted(async () => {
    await getBandById()
})

const getBandById = async () => {
    try {
        let res = await axios.get('api/bands/' + route.params.id)
        band.value = res.data
    } catch (error) {
        console.log(error)
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/variables';

.posts-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 2rem;

    .card {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 0.8rem;
        border-radius: 3px;
        width: 100%;
        @media screen and (max-width:550px) {
            text-align: center;
        }

        .image {
            width: 50%;

            img {
                width: 100%;
            }
        }

        .post-content {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
            flex-direction: column;
            padding: 1rem;

            p {
                width: 50vw;
                padding: 1rem;
                text-align: center;
                margin-bottom: 2rem;
                line-height: 1.5;
                letter-spacing:0.05rem;
            }
            h3 {
                text-transform: uppercase;
                font-size: 2rem;
            }
        }
    }

    .footer {
        width: 80%;
        padding: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
        .link{
            color: $green;
            &:hover{
                text-shadow: 0 0 5px $green;
            }
        }
    }

    .actions {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        gap: 0.8rem;
        align-items: center;
        margin-top: 1rem;
    }
}
</style>