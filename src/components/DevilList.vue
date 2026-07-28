<template>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div v-for="devil in devils" :key="devil.id" class="border-0 border-slate-300 p-0">
            <DevilCard :devil="devil" :usage="usage" :skill="skill" @listen="listen">
                <button :disabled="!devil.fusion" @click.stop="start_bom(devil)"
                    class="flex items-center gap-1.5 rounded bg-amber-500 px-3 py-2 text-sm font-semibold text-white hover:bg-amber-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:hover:bg-slate-200">
                    <IconStepInto class="h-5 w-5" />
                    {{ $t('message.reverse_fusion') }}
                </button>
                <button :disabled="!devil.fusionAsMaterial" @click.stop="fusion(devil)"
                    class="flex items-center gap-1.5 rounded bg-slate-700 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:hover:bg-slate-200">
                    <IconStepOut class="h-5 w-5" />
                    {{ $t('message.normal_fusion') }}
                </button>
            </DevilCard>
        </div>
    </div>
</template>

<script setup>
import { IconStepOut, IconStepInto } from '@tabler/icons-vue'
import DevilCard from './DevilCard.vue'

defineProps({
    devils: { type: Array, default: () => [] },
    usage: { type: String, default: '' },
    skill: { type: Object, default: null }
})

const emit = defineEmits(['listen'])

function listen(res) {
    emit('listen', res)
}

function fusion(devil) {
    listen({ name: 'fusion', value: devil })
}

function start_bom(devil) {
    listen({ name: 'start_bom', value: devil })
}
</script>
