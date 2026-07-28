<template>
  <div class="space-y-4">
    <div v-if="!fusion_target" class="rounded border border-slate-300 bg-white p-3 shadow-sm text-slate-600">
      {{ $t('message.select_devil_for_fusion') }}
    </div>
    <div v-else class="space-y-4">
      <div class="rounded border border-slate-300 bg-white p-3 shadow-sm">
        <div class="flex flex-wrap gap-2">
          <button v-for="option in visibleFusionRarityOptions" :key="option.text"
            @click="fusion_rarity_option_click(option)"
            :class="['rounded px-3 py-2 text-sm font-medium', option.state ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-700']">
            {{ option.text }}
          </button>
        </div>
      </div>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <template v-for="(option, index) in filtered_fusion_options" :key="option.devil.id">
          <div @click="toggleFusion(index)" class="cursor-pointer">
            <DevilCard :devil="option.devil" usage="fusion" @listen="onListen"
              :class="fusion_open_index === index ? 'ring-2 ring-sky-500' : ''"></DevilCard>
          </div>
          <div v-if="fusion_open_index === index" class="col-span-full rounded border border-slate-300 bg-white p-3 shadow-sm">
            <DevilBomOptions :options="option.formulas" usage="fusion" @listen="onListen"></DevilBomOptions>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMainStore } from '../stores/main'
import DevilCard from '../components/DevilCard.vue'
import DevilBomOptions from '../components/DevilBomOptions.vue'

const props = defineProps({
  devil: { type: String, default: '' }
})

const emit = defineEmits(['listen'])

const route = useRoute()
const store = useMainStore()

const fusion_open_index = ref(null)
const fusion_rarity_options = ref([])

const races = computed(() => store.races)
const devils = computed(() => store.devils)
const fusion_target = computed(() => store.fusion_target)
const fusion_options = computed(() => store.fusion_options)
const down_grade = computed(() => store.down_grade)

const fusionOptionsSource = computed(() => {
  if (Array.isArray(fusion_options.value) && fusion_options.value.length) {
    return fusion_options.value
  }
  if (fusion_target.value && typeof fusion_target.value.fusion_formulas === 'function') {
    return fusion_target.value.fusion_formulas()
  }
  return []
})

// Which r1+r2 rarity pairs actually occur among the current target's combos,
// independent of which rarity buttons the user has toggled on/off — used to
// hide filter buttons for combinations that don't exist for this devil.
const availableRarityTexts = computed(() => {
  const set = new Set()
  const downGrade = down_grade.value

  fusionOptionsSource.value.forEach(option => {
    option.formulas.forEach(formula => {
      if (!formula || !Array.isArray(formula.boms)) return
      formula.boms.forEach(bom => {
        if (!bom || !bom.child1 || !bom.child2) return
        const r = bom.devil.rarity
        const [r1, r2] = [bom.child1.devil.rarity, bom.child2.devil.rarity].sort((a, b) => a - b)
        if (downGrade === '1' || (r >= r1 && r >= r2)) {
          set.add(`${r1}+${r2}`)
        }
      })
    })
  })

  return set
})

const visibleFusionRarityOptions = computed(() => {
  return fusion_rarity_options.value.filter(opt => availableRarityTexts.value.has(opt.text))
})

const filtered_fusion_options = computed(() => {
  const options = []
  const filters = visibleFusionRarityOptions.value.filter(opt => opt.state)
  const downGrade = down_grade.value

  fusionOptionsSource.value.forEach(option => {
    const formulas = []
    option.formulas.forEach(formula => {
      if (!formula || !Array.isArray(formula.boms)) return
      const boms = formula.boms.filter(bom => {
        if (!bom || !bom.child1 || !bom.child2) return false
        const r = bom.devil.rarity
        const [r1, r2] = [bom.child1.devil.rarity, bom.child2.devil.rarity].sort((a, b) => a - b)
        return (downGrade === '1' || (r >= r1 && r >= r2)) && filters.some(filter => filter.text === `${r1}+${r2}`)
      })
      if (boms.length) formulas.push({ name: formula.name, boms })
    })
    if (formulas.length) options.push({ devil: option.devil, formulas, active: false })
  })

  return options
})

function initRarityOptions() {
  for (let i = 1; i <= 5; i++) {
    for (let j = i; j <= 5; j++) {
      const text = `${i}+${j}`
      fusion_rarity_options.value.push({ text, state: true })
    }
  }
}

function onListen(res) {
  emit('listen', res)
}

function toggleFusion(index) {
  fusion_open_index.value = fusion_open_index.value === index ? null : index
}

function fusion_rarity_option_click(option) {
  const filters = visibleFusionRarityOptions.value
  const still_stands = filters.filter(opt => opt.state)
  if (filters.length === 1) return
  if (still_stands.length === filters.length) {
    filters.forEach(opt => { opt.state = opt === option })
  } else if (still_stands.length === 1 && still_stands[0] === option) {
    filters.forEach(opt => { opt.state = true })
  } else {
    option.state = !option.state
  }
}

function findDevilByName(name) {
  if (!name) return null
  const normalized = name.toString().trim()
  const fromAll = devils.value.find(d => Object.values(d.names).includes(normalized))
  if (fromAll) return fromAll
  for (const race of races.value) {
    const found = race.devils.find(d => Object.values(d.names).includes(normalized))
    if (found) return found
  }
  return null
}

function setFusionTarget(devil) {
  store.fusion_target = devil
  const formulas = typeof devil.fusion_formulas === 'function'
    ? devil.fusion_formulas()
    : []
  store.fusion_options = Array.isArray(formulas) ? formulas : []
}

function resolveRouteTarget() {
  const devilName = props.devil || route.query.devil || route.query.demon
  if (!devilName) return
  const targetDevil = findDevilByName(devilName)
  if (!targetDevil) return
  if (!fusion_target.value || fusion_target.value.id !== targetDevil.id) {
    setFusionTarget(targetDevil)
  }
}

watch(() => props.devil, () => resolveRouteTarget())

onMounted(() => {
  initRarityOptions()
  resolveRouteTarget()
})
</script>
