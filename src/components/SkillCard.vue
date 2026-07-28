<template>
    <div class="rounded border border-slate-300 bg-white shadow-sm">
        <div @click="toggleActive"
            :class="['flex items-center text-left text-slate-800', expandable ? 'cursor-pointer hover:bg-slate-50' : '', compact ? 'gap-2 px-3 py-2' : 'gap-3 px-4 py-3']">
            <div :class="['flex flex-shrink-0 items-center justify-center rounded-lg', compact ? 'h-8 w-8' : 'h-10 w-10']" :style="typeStyle">
                <component :is="typeIcon" :class="compact ? 'h-4 w-4' : 'h-5 w-5'" />
            </div>
            <div class="min-w-0 flex-1">
                <div class="truncate font-semibold">{{ skill.showName() }}</div>
                <div class="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                    <span v-if="skill.type" class="rounded-full px-2 py-0.5 text-xs font-medium" :style="typeStyle">{{ skill.type.showName() }}</span>
                    <span>{{ skill.mp ? 'MP: ' + skill.mp : '' }} {{ skill.point ? ' ' + $t('message.inherit') + ': ' + skill.point : '' }}</span>
                </div>
            </div>
            <button @click.stop="showDesc = !showDesc" :class="['flex flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200', compact ? 'h-7 w-7' : 'h-9 w-9']">
                <IconNews :class="compact ? 'h-4 w-4' : 'h-6 w-6'" />
            </button>
        </div>
        <div v-if="showDesc" class="border-t border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            {{ skill.showDesc() }}
        </div>
        <div v-if="active" class="border-t border-slate-200 p-4">
            <div class="flex flex-col gap-2">
                <DevilCard v-for="devil in skill.devils" :key="devil.id" :devil="devil" usage="skill" @listen="listen" :skill="skill"></DevilCard>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { IconNews } from '@tabler/icons-vue'
import SKILL_TYPE_STYLES from '../utility/skillTypeStyles'
import DevilCard from './DevilCard.vue'

const props = defineProps({
    skill: { type: Object, required: true },
    expandable: { type: Boolean, default: true },
    compact: { type: Boolean, default: false }
})

const emit = defineEmits(['listen'])

const active = ref(false)
const showDesc = ref(false)

function toggleActive() {
    if (props.expandable) active.value = !active.value
}

const typeConf = computed(() => SKILL_TYPE_STYLES[props.skill.type?.id])
const typeIcon = computed(() => typeConf.value?.icon)
const typeStyle = computed(() => {
    return typeConf.value ? { backgroundColor: typeConf.value.bg, color: typeConf.value.color } : {}
})

function listen(res) {
    emit('listen', res)
}
</script>
