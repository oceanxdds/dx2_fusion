<template>
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div v-for="bom in boms" :key="`${bom.child1.devil.id}-${bom.child2.devil.id}`">
            <DevilBom :bom="bom" :usage="usage" @listen="listen"></DevilBom>
        </div>
    </div>
</template>

<script setup>
import DevilBom from './DevilBom.vue'

defineProps({
    boms: { type: Array, default: () => [] },
    usage: { type: String, default: '' }
})

const emit = defineEmits(['listen'])

function listen(res) {
    emit('listen', res)
}
</script>
