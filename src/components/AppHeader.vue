<template>
  <header class="bg-sky-800 text-white">
    <div class="mx-auto flex max-w-[1920px] flex-wrap items-center justify-between gap-3 px-4 py-3">
      <div class="flex flex-wrap items-center gap-3">
        <button @click="goRoute('devil')" class="text-xl font-bold">Dx2</button>

        <nav class="hidden items-center gap-1 rounded-xl bg-white/10 p-1 md:flex">
          <button v-for="tab in tabs" :key="tab.id" @click="goRoute(tab.name, tab.params)"
            :class="['whitespace-nowrap rounded-lg px-4 py-1.5 text-sm font-medium transition-colors duration-150', navClasses[tab.id]]">
            {{ $t(tab.label) }}
          </button>
        </nav>

        <div ref="mobileNavRef" class="relative md:hidden">
          <button @click="mobileNavOpen = !mobileNavOpen" class="flex items-center gap-1 rounded border border-white/30 bg-white/10 px-3 py-2 text-sm">
            {{ $t(currentTab.label) }}
            <IconChevronDown class="h-4 w-4" />
          </button>
          <div v-if="mobileNavOpen" class="absolute left-0 z-20 mt-1 min-w-[10rem] overflow-hidden rounded border border-slate-200 bg-white shadow-lg">
            <button v-for="tab in tabs" :key="tab.id" @click="selectMobileTab(tab)"
              :class="['block w-full px-3 py-2 text-left text-sm', tab.id === currentTab.id ? 'bg-sky-100 text-sky-900' : 'text-slate-700 hover:bg-slate-100']">
              {{ $t(tab.label) }}
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <button @click="goRoute('search')" :class="navClasses.search" class="rounded border border-white/30 px-3 py-2 text-sm hover:bg-white/20">
          <IconSearch class="h-5 w-5" />
        </button>
        <button @click="goRoute('setting')" :class="navClasses.setting" class="rounded border border-white/30 px-3 py-2 text-sm hover:bg-white/20">
          <IconSettings class="h-5 w-5" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { IconChevronDown, IconSearch, IconSettings } from '@tabler/icons-vue'

defineOptions({ name: 'AppHeader' })

const props = defineProps({
  currentRouteName: { type: String, default: '' }
})

const emit = defineEmits(['go-route'])

const tabs = [
  { id: 'fusion.devil', label: 'message.devil', name: 'devil', params: {} },
  { id: 'fusion.fission', label: 'message.reverse_fusion', name: 'fusion', params: { mode: 'reverse' } },
  { id: 'fusion.fusion', label: 'message.normal_fusion', name: 'fusion', params: { mode: 'normal' } },
  { id: 'skill', label: 'message.skill', name: 'skill', params: {} }
]

const routeNameByTab = {
  'fusion.devil': 'devil',
  'fusion.fission': 'fusion-reverse',
  'fusion.fusion': 'fusion-normal'
}

const activeClass = 'bg-white text-slate-900 shadow-sm'
const inactiveClass = 'text-white/80 hover:bg-white/20 hover:text-white'

const navClasses = computed(() => {
  const isActive = (tab) => props.currentRouteName === (routeNameByTab[tab] || tab)
  return {
    'fusion.devil': isActive('fusion.devil') ? activeClass : inactiveClass,
    'fusion.fission': isActive('fusion.fission') ? activeClass : inactiveClass,
    'fusion.fusion': isActive('fusion.fusion') ? activeClass : inactiveClass,
    skill: isActive('skill') ? activeClass : inactiveClass,
    setting: isActive('setting') ? activeClass : inactiveClass,
    search: isActive('search') ? activeClass : inactiveClass
  }
})

const currentTab = computed(() => {
  return tabs.find(tab => props.currentRouteName === (routeNameByTab[tab.id] || tab.id)) || tabs[0]
})

const mobileNavOpen = ref(false)
const mobileNavRef = ref(null)
onClickOutside(mobileNavRef, () => { mobileNavOpen.value = false })

function goRoute(name, params = {}, query = {}) {
  emit('go-route', name, params, query)
}

function selectMobileTab(tab) {
  goRoute(tab.name, tab.params)
  mobileNavOpen.value = false
}
</script>
