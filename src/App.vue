<script setup>
import { useAppShell } from './composables/useAppShell'
import AppShellLayout from './components/AppShellLayout.vue'

const {
  updated_at,
  currentRouteName,
  show_info_modal,
  orbs,
  goRoute,
  listen
} = useAppShell()
</script>

<template>
  <app-shell-layout
    :current-route-name="currentRouteName"
    :show-info-modal="show_info_modal"
    :orbs="orbs"
    :updated-at="updated_at"
    @go-route="goRoute"
    @listen="listen"
    @close-info="show_info_modal = false"
  />
</template>
