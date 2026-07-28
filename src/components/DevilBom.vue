<template>
    <div v-if="bom" class="rounded border bg-white shadow-sm" :class="borderClass">
        <div class="flex items-center gap-1 px-3 pt-3 text-xs font-medium text-sky-600">
            <IconLink class="h-3.5 w-3.5" />
            <span>{{ $t('message.combination') }}</span>
        </div>
        <div @click="click" class="flex flex-col gap-2 p-3">
            <div v-for="devil in children" :key="devil.id" class="flex items-center gap-3 rounded border border-slate-200 p-2">
                <div class="h-12 w-12 flex-shrink-0 rounded-lg bg-sky-50" :style="thumbnailStyle(devil)"></div>
                <div class="min-w-0 flex-1">
                    <div class="truncate font-semibold" :class="textClass">{{ devil.race.showName() }} {{ devil.showName() }}</div>
                    <div class="mt-1 flex flex-wrap items-center gap-2 text-sm">
                        <span class="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-700">{{ devil.showGrade() }}</span>
                        <span class="text-amber-400">{{ devil.showRarity() }}</span>
                    </div>
                </div>
                <button @click.stop="info(devil)" class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200">
                    <IconNews class="h-6 w-6" />
                </button>
            </div>
        </div>
        <div class="flex flex-wrap items-center gap-2 border-t border-slate-200 p-3 text-sm text-slate-700">
            <span v-if="bom.mag_pure!=bom.mag" class="rounded-full bg-emerald-100 px-2 py-1 font-semibold text-emerald-800">{{ $t('archetype.common') }} {{ bom.showMagPure() }}</span>
            <span v-if="bom.mag>0" class="rounded-full bg-slate-100 px-2 py-1">MAG {{ bom.showMag() }}</span>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { IconLink, IconNews } from '@tabler/icons-vue'

const props = defineProps({
    bom: { type: Object, required: true },
    usage: { type: String, default: '' }
})

const emit = defineEmits(['listen'])

const baseURL = import.meta.env.BASE_URL || '/'

const borderClass = computed(() => {
    return props.bom.upgrade ? 'border-emerald-500' : props.bom.downgrade ? 'border-rose-500' : 'border-slate-300'
})

const textClass = computed(() => {
    return props.bom.upgrade ? 'text-sky-800' : props.bom.downgrade ? 'text-rose-800' : 'text-slate-900'
})

const children = computed(() => {
    return [props.bom.child1, props.bom.child2, props.bom.child3, props.bom.child4]
        .filter(Boolean)
        .map(child => child.devil)
})

function click() {
    if (props.usage == 'builder') {
        emit('listen', { name: 'choose_bom', value: props.bom })
    }
}

function info(devil) {
    emit('listen', { name: 'info', value: devil })
}

function thumbnailStyle(devil) {
    return `background-image:url('${baseURL}images/devil/${devil.icon}'); background-position:center; background-repeat:no-repeat; background-size:cover;`
}
</script>
