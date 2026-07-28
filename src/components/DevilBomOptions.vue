<template>
    <div class="flex flex-col gap-4">
        <div v-for="option in options" :key="option.name">
            <div class="mb-2">
                <h6 class="m-0">{{ option.name }}</h6>
            </div>
            <DevilBomList :boms="option.boms" :usage="usage" @listen="listen"></DevilBomList>
        </div>
    </div>
</template>

<script setup>
import DevilBomList from './DevilBomList.vue'

defineProps({
    options: { type: Array, default: () => [] },
    usage: { type: String, default: '' }
})

const emit = defineEmits(['listen'])

function listen(res) {
    emit('listen', res)
}
</script>
