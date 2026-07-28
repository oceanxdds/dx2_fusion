<template>
  <div class="space-y-4">
    <div class="grid gap-4 lg:grid-cols-3">
      <div class="rounded border border-slate-300 bg-white p-4 shadow-sm">
        <div class="font-semibold">{{ $t('message.language') }}</div>
        <div class="mt-3 grid gap-2">
          <label v-for="option in lang_options" :key="option.value" class="flex items-center gap-2 rounded border border-slate-200 px-3 py-2">
            <input type="radio" name="lang" :value="option.value" v-model="lang_value" class="h-4 w-4 text-sky-600" />
            <span class="text-sm">{{ $t(option.text) }}</span>
          </label>
        </div>
      </div>

      <div class="rounded border border-slate-300 bg-white p-4 shadow-sm">
        <div class="font-semibold">{{ $t('message.downgrade_fusion') }}</div>
        <div class="mt-3 grid gap-2">
          <label v-for="option in down_grade_options" :key="option.value" class="flex items-center gap-2 rounded border border-slate-200 px-3 py-2">
            <input type="radio" name="downgrade" :value="option.value" v-model="down_grade" class="h-4 w-4 text-sky-600" />
            <span class="text-sm">{{ $t(option.text) }}</span>
          </label>
        </div>
      </div>
    </div>

    <div class="relative overflow-hidden rounded border border-slate-300 bg-white p-4 shadow-sm bg-no-repeat bg-right bg-[length:auto_100%]" :style="stevenBackgroundStyle">
      <p class="relative text-sm leading-relaxed text-slate-700">
        君は私が作った悪魔召喚プログラムを使ってるね<br />
        もし君が秩序にも混沌にも偏らず<br />
        中庸の道を往くのなら<br />
        私が僅かばかりだが協力してあげよう<br /><br />
        人間が持つ価値を　可能性を<br />
        私に証明してくれ<br /><br />
        STEVEN
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Cookie from '../utility/cookie'
import { setI18nLocale } from '../utility/i18n'
import { useMainStore } from '../stores/main'

const store = useMainStore()

const baseURL = import.meta.env.BASE_URL || '/'
const stevenBackgroundStyle = {
  backgroundImage: `url('${baseURL}images/theme/steven.png')`
}

const lang_options = [
  { text: '日本語', value: 'ja' },
  { text: '繁體中文', value: 'tw' },
  { text: 'English', value: 'en' }
]
const down_grade_options = [
  { text: 'message.allow', value: '1' },
  { text: 'message.deny', value: '0' }
]

const lang_value = computed({
  get() {
    return store.lang_value
  },
  set(value) {
    if (lang_options.map(x => x.value).includes(value)) {
      store.lang_value = value
      Cookie.setItem('lang_value', value)
      setI18nLocale(value)
    }
  }
})

const down_grade = computed({
  get() {
    return store.down_grade
  },
  set(value) {
    if (down_grade_options.map(x => x.value).includes(value)) {
      store.down_grade = value
      Cookie.setItem('allow_down_grade', value)
    }
  }
})
</script>
