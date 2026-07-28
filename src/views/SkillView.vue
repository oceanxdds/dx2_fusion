<template>
  <div class="space-y-4">
    <div class="rounded border border-slate-300 bg-white p-3 shadow-sm">
      <div class="flex flex-wrap gap-2">
        <button v-for="(type, index) in skillTypes" :key="type.id || index" @click="skillType_id = index"
          :style="tabStyle(type, skillType_id === index)"
          class="flex items-center gap-1.5 rounded px-3 py-2 text-sm font-medium">
          <component :is="typeIcon(type)" class="h-5 w-5" />
          <span>{{ type.showName() }}</span>
        </button>
      </div>
    </div>

    <SkillList :skills="skills_by_type" @listen="onListen"></SkillList>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMainStore } from '../stores/main'
import SkillList from '../components/SkillList.vue'
import SKILL_TYPE_STYLES from '../utility/skillTypeStyles'

const emit = defineEmits(['listen'])

const store = useMainStore()
const skillType_id = ref(0)

const skillTypes = computed(() => store.skillTypes)
const skills_by_type = computed(() => {
  const index = Math.min(skillType_id.value, skillTypes.value.length - 1)
  return skillTypes.value[index] ? skillTypes.value[index].skills : []
})

function typeIcon(type) {
  return SKILL_TYPE_STYLES[type.id]?.icon
}

function tabStyle(type, isSelected) {
  const conf = SKILL_TYPE_STYLES[type.id]
  if (!conf) return {}
  return {
    backgroundColor: conf.bg,
    color: conf.color,
    border: isSelected ? `2px solid ${conf.color}` : '2px solid transparent'
  }
}

function onListen(res) {
  emit('listen', res)
}
</script>
