<template>
    <div class="rounded border border-slate-300 bg-white shadow-sm">
        <!-- builder usage renders as a compact fusion-tree node; keep the old
             icon-as-background style so narrow tree columns still fit. -->
        <div v-if="usage==='builder'" @click="click" class="cursor-pointer" :title="tooltipText">
            <div class="rounded px-4 py-1" :style="backgroundStyle">
                <div class="font-semibold text-slate-900">{{ usageLabel }}</div>
                <div class="mt-2 text-sm text-slate-600">
                    <span>{{ devil.showGrade() }} {{ devil.showRarity() }}</span>
                </div>
            </div>
        </div>

        <div v-else @click="click" class="flex cursor-pointer items-center gap-3 p-3" :title="tooltipText">
            <div class="h-12 w-12 flex-shrink-0 rounded-lg bg-sky-50" :style="thumbnailStyle"></div>
            <div class="min-w-0 flex-1">
                <div class="truncate font-semibold text-slate-900">{{ usageLabel }}</div>
                <div class="mt-1 flex flex-wrap items-center gap-2 text-sm">
                    <span class="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-700">{{ devil.showGrade() }}</span>
                    <span class="text-amber-400">{{ devil.showRarity() }}</span>
                    <span v-if="usage==='skill'" class="flex flex-wrap gap-2">
                        <span v-if="isSkillAvailable(0)" class="rounded bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-800">{{ $t('message.possess') }}</span>
                        <span v-if="isSkillAvailable(1)" class="rounded bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800">{{ $t('message.inherit') }}</span>
                    </span>
                </div>
            </div>
            <button v-if="usage!=='info'" @click.stop="info" class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200">
                <IconNews class="h-6 w-6" />
            </button>
        </div>

        <div v-if="usage==='fission' && hasFooterContent" class="flex flex-wrap gap-2 border-t border-slate-200 px-3 py-2">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { Comment, computed, useSlots } from 'vue'
import { IconNews } from '@tabler/icons-vue'

defineOptions({ name: 'DevilCard' })

const props = defineProps({
    devil: { type: Object, required: true },
    usage: { type: String, default: '' },
    skill: { type: Object, default: null },
    source: { type: String, default: '' }
})

const emit = defineEmits(['listen'])

const slots = useSlots()

const hasFooterContent = computed(() => {
    const nodes = slots.default ? slots.default() : []
    return nodes.some(vnode => vnode.type !== Comment)
})

const baseURL = import.meta.env.BASE_URL || '/'

const usageLabel = computed(() => {
    return props.usage === 'fusion' || props.usage === 'fission' || props.usage === 'info' || props.usage === 'skill'
        ? props.devil.race.showName() + ' ' + props.devil.showName()
        : props.devil.showName()
})

const backgroundStyle = computed(() => {
    const image = baseURL + 'images/devil/' + props.devil.icon
    return `background-image:url('${image}'); background-position:right; background-repeat:no-repeat; background-size:contain;`
})

const thumbnailStyle = computed(() => {
    const image = baseURL + 'images/devil/' + props.devil.icon
    return `background-image:url('${image}'); background-position:center; background-repeat:no-repeat; background-size:cover;`
})

const tooltipText = computed(() => {
    return props.devil.race.showName() + ' ' + props.devil.showName()
})

function listen(res) {
    emit('listen', res)
}

function click() {
    if (props.usage === 'fission') {
        if (props.devil.fusion)
            listen({ name: 'start_bom', value: props.devil })
    }
    if (props.usage === 'builder') {
        if (props.devil.fusion)
            listen({ name: 'list_bom', value: null })
    }
}

function info() {
    listen({ name: 'info', value: props.devil })
}

function isSkillAvailable(inherit) {
    if (inherit) {
        return props.skill === props.devil.skills[0] || props.devil.skill5.indexOf(props.skill) >= 0
    } else {
        return props.skill === props.devil.skills[1] || props.skill === props.devil.skills[2] || props.devil.skill4.indexOf(props.skill) >= 0
    }
}
</script>
