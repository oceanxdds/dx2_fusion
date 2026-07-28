<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" @keydown.esc="$emit('close')" @click="$emit('close')">
      <div ref="dialogRef" @click.stop class="w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="devil-info-title">
        <div class="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 id="devil-info-title" class="text-xl font-semibold">{{ $t('message.profile') }}</h2>
          <button @click="$emit('close')" class="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200">
            <IconX class="h-5 w-5" />
          </button>
        </div>
        <div class="max-h-[80vh] overflow-y-auto p-5">
          <div v-if="info_devil" class="space-y-4">
            <DevilCard :devil="info_devil" usage="info"></DevilCard>

            <div class="space-y-4">
              <div class="rounded-xl border border-slate-200 p-4">
                <div class="mb-3 flex items-center gap-2 font-semibold text-slate-800">
                  <IconShield class="h-5 w-5 text-slate-400" />
                  {{ $t('message.elements') }}
                </div>
                <div class="grid grid-cols-7 divide-x divide-slate-200 overflow-hidden rounded-lg border border-slate-200">
                  <div v-for="(ele, index) in elements" :key="index">
                    <div class="py-1.5 text-center text-base font-bold" :style="{ backgroundColor: ele.bg, color: ele.color }">{{ $t(ele.slug) }}</div>
                    <div class="bg-white py-1.5 text-center text-base font-semibold" :class="resistClass(info_devil.elements[index])">
                      {{ info_devil.elements[index] ? $t('element.' + info_devil.elements[index]) : 'ー' }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="rounded-xl border border-slate-200 p-4">
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div v-for="(group, gIndex) in skillGroups" :key="gIndex">
                    <div class="mb-2 flex items-center gap-2 font-semibold text-slate-800">
                      <IconSparkles class="h-5 w-5 text-slate-400" />
                      <span v-if="group.archetypeSlug">{{ $t(group.archetypeSlug) }}{{ $t('message.skill') }}</span>
                      <span v-else>{{ $t('message.skill_common') }}</span>
                    </div>
                    <div class="flex flex-col gap-1.5">
                      <SkillCard v-for="skill in group.skills" :key="skill.id" :skill="skill" :expandable="false" compact></SkillCard>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { IconShield, IconSparkles, IconX } from '@tabler/icons-vue'
import { useMainStore } from '../stores/main'
import DevilCard from './DevilCard.vue'
import SkillCard from './SkillCard.vue'

defineEmits(['close'])

const store = useMainStore()

const info_devil = computed(() => store.info_devil)

const dialogRef = ref(null)
const { activate } = useFocusTrap(dialogRef)

onMounted(() => {
  activate()
})

const archetypeSlugs = ['archetype.common', 'archetype.aragami', 'archetype.protector', 'archetype.psychic', 'archetype.elementalist']

const skillGroups = computed(() => {
    if (!info_devil.value) return []
    return [
        { skills: info_devil.value.skills.filter(skill => skill.id) },
        ...archetypeSlugs.map((slug, index) => ({
            archetypeSlug: slug,
            skills: [info_devil.value.skill4[index], info_devil.value.skill5[index]].filter(skill => skill.id)
        }))
    ].filter(group => group.skills.length > 0)
})

const elements = [
    { slug: 'element.phys', bg: 'rgb(230, 230, 230)', color: 'rgb(90, 90, 90)' },
    { slug: 'element.fire', bg: 'rgb(250, 224, 224)', color: 'rgb(165, 55, 55)' },
    { slug: 'element.ice', bg: 'rgb(222, 244, 248)', color: 'rgb(30, 110, 130)' },
    { slug: 'element.elec', bg: 'rgb(252, 249, 210)', color: 'rgb(140, 120, 10)' },
    { slug: 'element.force', bg: 'rgb(224, 248, 228)', color: 'rgb(40, 120, 60)' },
    { slug: 'element.light', bg: 'rgb(250, 248, 232)', color: 'rgb(150, 120, 70)' },
    { slug: 'element.dark', bg: 'rgb(246, 228, 247)', color: 'rgb(140, 60, 145)' }
]

function resistClass(code) {
    return {
        'text-sky-700': code == 'nu' || code == 'rp' || code == 'dr',
        'text-rose-700': code == 'wk',
        'text-slate-700': !code || code == 'rs'
    }
}
</script>
