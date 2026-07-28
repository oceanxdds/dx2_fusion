<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <app-header
      :current-route-name="currentRouteName"
      @go-route="(...args) => emit('go-route', ...args)"
    />

    <main class="mx-auto max-w-[1920px] px-4 py-4">
      <router-view v-slot="{ Component }">
        <Suspense>
          <component :is="Component" @listen="(res) => emit('listen', res)" />
          <template #fallback>
            <div class="rounded border border-slate-300 bg-white p-6 text-center text-slate-500 shadow-sm">
              {{ $t('message.loading') }}
            </div>
          </template>
        </Suspense>
      </router-view>
    </main>

    <app-footer :orbs="orbs" :updated-at="updatedAt" />

    <devil-info v-if="showInfoModal" @close="emit('close-info')" />
  </div>
</template>

<script setup>
import DevilInfo from './DevilInfo.vue'
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'

defineOptions({ name: 'AppShellLayout' })

defineProps({
  currentRouteName: { type: String, default: '' },
  showInfoModal: { type: Boolean, default: false },
  orbs: { type: Array, default: () => [] },
  updatedAt: { type: String, default: '' }
})

const emit = defineEmits(['go-route', 'listen', 'close-info'])
</script>
