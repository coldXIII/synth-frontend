<template>
    <div class="input__wrapper">
        <label for="textInput" class="label">{{ label }}</label>
        <input :type="inputType" :placeholder="placeholder" class="text__input" id="textInput" v-model="computedInput">
        <span v-if="error" class="error">{{ error }}</span>
    </div>
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue';

const emit = defineEmits(['update:input'])

const props = defineProps({
    label: String,
    input: String,
    inputType: String,
    error: String,
    placeholder: { type: String, default: '' }
})

const { label, input, inputType, error, placeholder } = toRefs(props)

const computedInput = computed({
    get: () => input?.value,
    set: (val) => emit('update:input', val)
})

</script>

<style scoped lang="scss">
@import '@/assets/variables';

.input__wrapper {
    margin: 1rem auto;
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 0.5rem;

    .text__input {
        width: 90%;
        padding: 0.5rem;
        border-radius: 0.5rem;

    }

    .label {
        width: 90%;
        padding: 0.2rem;
        font-size: 0.7rem;
        color: $purple;
        text-align: left;
        text-transform: uppercase;
    }

    .error {
        width: 90%;
        padding: 0.2rem;
        font-size: 0.8rem;
        color: red;
        text-align: left;
    }
}
</style>