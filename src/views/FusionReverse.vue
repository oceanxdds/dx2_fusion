<template>
  <div class="space-y-4">
    <div v-if="!builder_target" class="rounded border border-slate-300 bg-white p-3 shadow-sm text-slate-600">
      {{ $t('message.select_devil_for_reverse_fusion') }}
    </div>
    <div v-else class="space-y-4">
      <div class="rounded border border-slate-300 bg-white p-3 shadow-sm">
        <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div class="text-sm text-slate-500">Total MAG</div>
            <div class="text-xl font-semibold">{{ totalMagPure }} ~ {{ totalMag }}</div>
          </div>
          <div class="flex flex-wrap gap-2">
            <button v-for="option in costdownRarityOptions" :key="option"
              @click="builder_auto_costdown(option,0)"
              class="rounded bg-green-500 px-3 py-2 text-sm font-semibold text-white hover:bg-green-600">
              素★{{ option }}
            </button>
          </div>
        </div>
      </div>

      <div class="rounded border border-slate-300 bg-white p-3 shadow-sm">
        <DevilBomBuilder :bom="builder_target" :parent_bom="null" @listen="onListen"></DevilBomBuilder>
      </div>

      <div v-if="builderOptionsSource.length" class="rounded border border-slate-300 bg-white p-3 shadow-sm">
        <div class="flex flex-wrap gap-2">
          <button v-for="option in visibleRarityOptions" :key="option.text"
            @click="builder_rarity_option_click(option)"
            :class="['rounded px-3 py-2 text-sm font-medium', option.state ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-700']">
            {{ option.text }}
          </button>
        </div>
      </div>

      <div v-if="filtered_builder_options.length>0" class="rounded border border-slate-300 bg-white p-3 shadow-sm">
        <DevilBomOptions :options="filtered_builder_options" usage="builder" @listen="onListen"></DevilBomOptions>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMainStore } from '../stores/main'
import DevilBomOptions from '../components/DevilBomOptions.vue'
import DevilBomBuilder from '../components/DevilBomBuilder.vue'

const props = defineProps({
  devil: { type: String, default: '' }
})

const emit = defineEmits(['listen'])

const route = useRoute()
const store = useMainStore()

const builder_rarity_options = ref([])

const races = computed(() => store.races)
const devils = computed(() => store.devils)
const builder_target = computed(() => store.builder_target)
const current_bom = computed(() => store.current_bom)
const down_grade = computed(() => store.down_grade)

const totalMagPure = computed(() => builder_target.value.showTotalMagPure())
const totalMag = computed(() => builder_target.value.showTotalMag())

// The combo list below describes whichever material node is currently selected
// in the tree; when nothing is selected (current_bom is null), it stays blank.
const builderOptionsSource = computed(() => {
  const bom = current_bom.value
  if (bom && bom.devil && typeof bom.devil.fission_formulas === 'function') {
    return bom.devil.fission_formulas()
  }
  return []
})

const costdownRarityOptions = computed(() => {
  if (!builder_target.value || !builder_target.value.devil) return []
  return [4, 3, 2, 1].filter(option => builder_target.value.devil.rarity > option)
})

// Which r1+r2 rarity pairs actually occur among the current node's combos,
// independent of which rarity buttons the user has toggled on/off — used to
// hide filter buttons for combinations that don't exist for this devil.
const availableRarityTexts = computed(() => {
  const set = new Set()
  const downGrade = down_grade.value

  builderOptionsSource.value.forEach(option => {
    option.boms.forEach(bom => {
      if (!bom || !bom.child1 || !bom.child2) return
      const r = bom.devil.rarity
      const [r1, r2] = [bom.child1.devil.rarity, bom.child2.devil.rarity].sort((a, b) => a - b)
      if (downGrade === '1' || (r >= r1 && r >= r2)) {
        set.add(`${r1}+${r2}`)
      }
    })
  })

  return set
})

const visibleRarityOptions = computed(() => {
  return builder_rarity_options.value.filter(opt => availableRarityTexts.value.has(opt.text))
})

const filtered_builder_options = computed(() => {
  const options = []
  const filters = visibleRarityOptions.value.filter(opt => opt.state)
  const downGrade = down_grade.value

  builderOptionsSource.value.forEach(option => {
    const boms = option.boms.filter(bom => {
      if (!bom || !bom.child1 || !bom.child2) return false
      const r = bom.devil.rarity
      const [r1, r2] = [bom.child1.devil.rarity, bom.child2.devil.rarity].sort((a, b) => a - b)
      return (downGrade === '1' || (r >= r1 && r >= r2)) && filters.some(filter => filter.text === `${r1}+${r2}`)
    })
    if (boms.length) options.push({ name: option.name, boms })
  })

  return options
})

function initRarityOptions() {
  for (let i = 1; i <= 5; i++) {
    for (let j = i; j <= 5; j++) {
      const text = `${i}+${j}`
      builder_rarity_options.value.push({ text, state: true })
    }
  }
}

function onListen(res) {
  emit('listen', res)
}

function builder_rarity_option_click(option) {
  const filters = visibleRarityOptions.value
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

function setBuilderTarget(devil) {
  const bom = devil.bom()
  store.builder_target = bom
  store.current_bom = bom
  const formulas = typeof devil.fission_formulas === 'function'
    ? devil.fission_formulas()
    : []
  store.builder_options = Array.isArray(formulas) ? formulas : []
}

function resolveRouteTarget() {
  const devilName = props.devil || route.query.devil || route.query.demon
  if (!devilName) return
  const targetDevil = findDevilByName(devilName)
  if (!targetDevil) return
  if (!builder_target.value || builder_target.value.devil?.id !== targetDevil.id) {
    setBuilderTarget(targetDevil)
  }
}

function builder_auto_costdown(rarity, type) {
  emit('listen', { name: 'auto_costdown', value: { rarity, type } })
}

watch(() => props.devil, () => resolveRouteTarget())

onMounted(() => {
  initRarityOptions()
  resolveRouteTarget()
})
</script>
