<template>
  <div class="space-y-4">
    <div class="rounded border border-slate-300 bg-white p-3 shadow-sm">
      <div class="flex flex-wrap gap-2">
        <button v-for="(race, index) in races" :key="race.id || index" @click="race_id = index"
          :class="['rounded px-3 py-2 text-sm', race_id === index ? 'bg-sky-700 text-white' : 'bg-slate-100 text-slate-700']">
          {{ race.showName() }}
        </button>
      </div>
    </div>

    <DevilList :devils="devils_by_race" usage="fission" @listen="onListen"></DevilList>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMainStore } from '../stores/main'
import DevilList from '../components/DevilList.vue'

const emit = defineEmits(['listen'])

const store = useMainStore()
const race_id = ref(0)

const races = computed(() => store.races)
const devils_by_race = computed(() => {
  const index = Math.min(race_id.value, races.value.length - 1)
  return races.value[index] ? races.value[index].devils : []
})

function onListen(res) {
  emit('listen', res)
}
</script>
