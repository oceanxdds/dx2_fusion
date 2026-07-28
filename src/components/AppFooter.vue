<template>
  <footer class="border-t border-slate-200 bg-slate-100 py-4">
    <div class="mx-auto flex max-w-[1920px] flex-wrap items-center justify-between gap-3 px-4">
      <div class="flex items-center gap-2">
        <img v-for="(orb, index) in orbs.filter(x => x.state)" :key="index" :src="orb.icon" class="h-8 w-8" />
      </div>
      <div class="flex items-center gap-3">
        <div class="text-sm text-slate-600">{{ $t('message.last_updated') }}: {{ updatedAt }}</div>
        <a href="https://github.com/oceanxdds/dx2_fusion" target="_blank" rel="noopener noreferrer" class="text-slate-500 hover:text-slate-900">
          <IconBrandGithub class="h-5 w-5" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { IconBrandGithub } from '@tabler/icons-vue'

defineOptions({ name: 'AppFooter' })

defineProps({
  orbs: { type: Array, default: () => [] },
  updatedAt: { type: String, default: '' }
})
</script>
