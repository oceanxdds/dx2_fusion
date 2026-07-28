<template>
    <div v-if="bom" class="flex flex-col items-center gap-2">
        <div class="flex flex-wrap items-center justify-center gap-2">
            <div ref="cardWrapperRef" class="relative z-10 bg-white" :style="{'min-width': source=='multi_fusion' ? '60px' : '130px'}">
                <DevilCard :devil="bom.devil" usage="builder" :source="source" @listen="listen"
                    :title="bom.devil.race.showName()+' '+bom.devil.showName()+'\n'+$t('message.fusion_mag_others')+': '+bom.showMag()+'\n'+$t('message.fusion_mag_pure')+': '+bom.showMagPure()"
                    :class="{'border border-amber-300': isCurrent, 'text-sky-700': isParentCurrent}">
                </DevilCard>
            </div>
            <div class="relative z-10 flex items-center gap-2">
                <button v-if="isCurrent" @click.stop="info()" class="rounded bg-sky-600 px-2 py-2 text-white hover:bg-sky-700"><IconNews class="h-5 w-5" /></button>
                <button v-if="isResettable" @click="reset_bom()" class="rounded bg-slate-100 px-3 py-2 text-sm text-slate-700 hover:bg-slate-200">✕</button>
                <button v-if="!isCurrent && (bom.child1 || bom.child2)" @click="toggle()" class="rounded bg-slate-100 px-2 py-2 text-slate-700 hover:bg-slate-200">
                    <component :is="collapsed ? IconSquarePlus : IconSquareMinus" class="h-5 w-5" />
                </button>
            </div>
        </div>
        <div v-if="!collapsed" class="flex flex-col md:flex-row flex-wrap items-center md:items-start justify-center gap-2">
            <div v-if="bom.child1"><DevilBomBuilder ref="child1Comp" :bom="bom.child1" @listen="listen" :parent_bom="bom" :source="childSource"></DevilBomBuilder></div>
            <div v-if="bom.child2"><DevilBomBuilder ref="child2Comp" :bom="bom.child2" @listen="listen" :parent_bom="bom" :source="childSource"></DevilBomBuilder></div>
            <div v-if="bom.child3"><DevilBomBuilder ref="child3Comp" :bom="bom.child3" @listen="listen" :parent_bom="bom" :source="childSource"></DevilBomBuilder></div>
            <div v-if="bom.child4"><DevilBomBuilder ref="child4Comp" :bom="bom.child4" @listen="listen" :parent_bom="bom" :source="childSource"></DevilBomBuilder></div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, watch } from 'vue'
import { useMainStore } from '../stores/main'
import { IconNews, IconSquareMinus, IconSquarePlus } from '@tabler/icons-vue'
import DevilCard from './DevilCard.vue'
import { useTreeConnectors } from '../composables/useTreeConnectors'

const props = defineProps({
    bom: { type: Object, required: true },
    parent_bom: { type: Object, default: null },
    source: { type: String, default: '' }
})

const emit = defineEmits(['listen'])

const store = useMainStore()
const collapsed = ref(false)

const cardWrapperRef = ref(null)
const child1Comp = ref(null)
const child2Comp = ref(null)
const child3Comp = ref(null)
const child4Comp = ref(null)

const { connect, clear, onRedraw, requestRedraw } = useTreeConnectors()

const current_bom = computed(() => store.current_bom)

const childSource = computed(() => {
    return props.source == 'multi_fusion' || props.bom.devil.source == 'multi_fusion' ? 'multi_fusion' : ''
})

function listen(res) {
    if (res.name == 'list_bom' && res.value == null)
        res.value = props.bom
    emit('listen', res)
}

function reset_bom() {
    listen({ name: 'reset_bom', value: props.bom })
}

function info() {
    listen({ name: 'info', value: props.bom.devil })
}

function toggle() {
    collapsed.value = !collapsed.value
}

const isCurrent = computed(() => {
    return props.bom ? props.bom == current_bom.value : false
})

const isParentCurrent = computed(() => {
    return props.parent_bom ? props.parent_bom == current_bom.value : false
})

const isResettable = computed(() => {
    return (props.bom.child1 || props.bom.child2) && (props.bom ? props.bom == current_bom.value : false)
})

function drawConnectors() {
    clear()
    if (collapsed.value) return
    const parentEl = cardWrapperRef.value
    const comps = [child1Comp.value, child2Comp.value, child3Comp.value, child4Comp.value].filter(Boolean)
    const childEls = comps.map(c => c.cardWrapperRef).filter(Boolean)
    childEls.forEach(childEl => connect(parentEl, childEl))
}

onRedraw(() => nextTick(drawConnectors))
onMounted(() => nextTick(drawConnectors))
watch(collapsed, () => requestRedraw())
watch(() => [props.bom.child1, props.bom.child2, props.bom.child3, props.bom.child4], () => requestRedraw())

defineExpose({ cardWrapperRef })
</script>
