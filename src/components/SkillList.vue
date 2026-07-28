<template>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <SkillCard v-for="skill in skills" :key="skill.id" :skill="skill" @listen="listen"></SkillCard>
    </div>
</template>

<script setup>
import SkillCard from './SkillCard.vue'

defineProps({
    skills: { type: Array, default: () => [] }
})

const emit = defineEmits(['listen'])

function listen(res) {
    emit('listen', res)
}
</script>
