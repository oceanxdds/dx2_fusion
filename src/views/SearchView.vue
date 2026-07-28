<template>
  <div class="space-y-4">
    <div class="rounded border border-slate-300 bg-white p-3 shadow-sm">
      <div class="relative">
        <IconSearch class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          v-model="input_keyword"
          type="text"
          autofocus
          :placeholder="$t('message.search')"
          class="w-full rounded border border-slate-300 py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-sky-300"
        />
      </div>
    </div>
    <div v-if="filtered_devils.length > 0" class="rounded border border-slate-300 bg-white p-3 shadow-sm">
      <DevilList :devils="filtered_devils" usage="fission" @listen="onListen"></DevilList>
    </div>
    <div v-if="filtered_skills.length > 0" class="rounded border border-slate-300 bg-white p-3 shadow-sm">
      <SkillList :skills="filtered_skills" @listen="onListen"></SkillList>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { refDebounced } from '@vueuse/core'
import { useRoute, useRouter } from 'vue-router'
import { IconSearch } from '@tabler/icons-vue'
import { useMainStore } from '../stores/main'
import DevilList from '../components/DevilList.vue'
import SkillList from '../components/SkillList.vue'

const emit = defineEmits(['listen'])

const route = useRoute()
const router = useRouter()
const store = useMainStore()

const input_keyword = ref(route.query.q || '')
const keyword = refDebounced(input_keyword, 300)

watch(keyword, (value) => {
  router.replace({ name: 'search', query: value ? { q: value } : {} }).catch(() => {})
})

const devils = computed(() => store.devils)
const skills = computed(() => store.skills)

const filtered_devils = computed(() => {
  const kw = keyword.value.replace(/[!@#$%^&*()\-=_+[\]{}|\\]/g, '')
  if (!kw) return []
  const re = new RegExp(kw, 'i')
  return devils.value.filter(d => Object.values(d.names).join().match(re))
})

const filtered_skills = computed(() => {
  const kw = keyword.value.replace(/[!@#$%^&*()\-=_+[\]{}|\\]/g, '')
  if (!kw) return []
  const re = new RegExp(kw, 'i')
  return skills.value.filter(s => Object.values(s.names).join().match(re))
})

function onListen(res) {
  emit('listen', res)
}
</script>
