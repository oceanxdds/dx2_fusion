import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMainStore } from '../stores/main'
import { setI18nLocale } from '../utility/i18n'
import Cookie from '../utility/cookie'

const baseURL = import.meta.env.BASE_URL || '/'

export function useAppShell() {
  const store = useMainStore()
  const route = useRoute()
  const router = useRouter()

  const updated_at = __BUILD_DATE__
  const lang_options = [
    { text: '日本語', value: 'ja' },
    { text: '繁體中文', value: 'tw' },
    { text: 'English', value: 'en' }
  ]
  const down_grade_options = [
    { text: 'message.allow', value: '1' },
    { text: 'message.deny', value: '0' }
  ]

  const show_info_modal = ref(false)
  const now = ref(null)
  const orbs = ref([
    { name: 'ライト', icon: baseURL + 'images/theme/light.png', state: false, days: [0, 1, 3, 5, 6] },
    { name: 'ダーク', icon: baseURL + 'images/theme/dark.png', state: false, days: [0, 1, 3, 5, 6] },
    { name: 'ニュートラル', icon: baseURL + 'images/theme/natural.png', state: false, days: [0, 1, 2, 3, 4, 5, 6] },
    { name: 'ロー', icon: baseURL + 'images/theme/law.png', state: false, days: [0, 2, 4, 6] },
    { name: 'カオス', icon: baseURL + 'images/theme/chaos.png', state: false, days: [0, 2, 4, 6] }
  ])

  const currentRouteName = computed(() => route.name || 'devil')
  const races = computed(() => store.races)
  const devils = computed(() => store.devils)
  const skills = computed(() => store.skills)
  const skillTypes = computed(() => store.skillTypes)
  const builder_target = computed(() => store.builder_target)
  const builder_options = computed(() => store.builder_options)
  const fusion_target = computed(() => store.fusion_target)
  const fusion_options = computed(() => store.fusion_options)
  const current_bom = computed(() => store.current_bom)
  const info_devil = computed(() => store.info_devil)

  const lang_value = computed({
    get: () => store.lang_value,
    set: (value) => {
      if (lang_options.map(item => item.value).includes(value)) {
        store.lang_value = value
        Cookie.setItem('lang_value', value)
        setI18nLocale(value)
      }
    }
  })

  const down_grade = computed({
    get: () => store.down_grade,
    set: (value) => {
      if (down_grade_options.map(item => item.value).includes(value)) {
        store.down_grade = value
        Cookie.setItem('allow_down_grade', value)
      }
    }
  })

  const initOrbs = () => {
    const currentTime = new Date()
    const utc = currentTime.getTime() + currentTime.getTimezoneOffset() * 60000
    now.value = new Date(utc + 9 * 3600000)
  }

  const tick = () => {
    if (!now.value) return
    const day = now.value.getDay()
    orbs.value.forEach(orb => {
      orb.state = orb.days.includes(day)
    })
  }

  const setI18nLocaleValue = (locale) => {
    setI18nLocale(locale)
  }

  const goRoute = (name, params = {}, query = {}) => {
    let nextName = name
    const nextParams = { ...params }
    const nextQuery = { ...query }

    if (nextName === 'fusion') {
      const mode = nextParams.mode || 'normal'
      nextName = mode === 'reverse' ? 'fusion-reverse' : 'fusion-normal'
      // Only an explicitly-passed devil should seed the destination page.
      // Falling back to the CURRENT route's query here would leak whichever
      // devil is showing on one mode into the other mode's target whenever
      // the user just switches tabs, making fusion-normal/fusion-reverse
      // appear to share a single target instead of each remembering its own.
      const explicitDevil = nextQuery.devil || nextQuery.demon
      if (!explicitDevil) {
        if (mode === 'reverse' && builder_target.value && builder_target.value.devil) {
          nextQuery.devil = builder_target.value.devil.names.ja
        } else if (mode === 'normal' && fusion_target.value) {
          nextQuery.devil = fusion_target.value.names.ja
        }
      }
    }

    router.push({ name: nextName, params: nextParams, query: nextQuery }).catch(() => {})
  }

  const listen = (res) => {
    switch (res?.name) {
      case 'info':
        show_devil_info(res.value)
        break
      case 'start_bom':
        start_bom(res.value)
        break
      case 'fusion':
        fusion(res.value)
        break
      case 'list_bom':
        list_bom(res.value)
        break
      case 'reset_bom':
        reset_bom(res.value)
        break
      case 'choose_bom':
        choose_bom(res.value)
        break
      case 'auto_costdown':
        builder_auto_costdown(res.value.rarity, res.value.type)
        break
    }
  }

  const show_devil_info = (devil) => {
    store.info_devil = devil
    show_info_modal.value = true
  }

  const start_bom = (devil) => {
    setBuilderTarget(devil)
    goRoute('fusion', { mode: 'reverse' }, { devil: devil.names.ja })
  }

  const fusion = (devil) => {
    setFusionTarget(devil)
    goRoute('fusion', { mode: 'normal' }, { devil: devil.names.ja })
  }

  const list_bom = (bom) => {
    store.current_bom = current_bom.value === bom ? null : bom
  }

  const choose_bom = (bom) => {
    if (current_bom.value) {
      current_bom.value.set(bom)
    }
    store.current_bom = null
  }

  const reset_bom = (bom) => {
    bom.unset()
    store.current_bom = null
  }

  const setBuilderTarget = (devil) => {
    const bom = devil.bom()
    store.builder_target = bom
    store.current_bom = bom
    const formulas = typeof devil.fission_formulas === 'function' ? devil.fission_formulas() : []
    store.builder_options = Array.isArray(formulas) ? formulas : []
  }

  const setFusionTarget = (devil) => {
    store.fusion_target = devil
    const formulas = typeof devil.fusion_formulas === 'function' ? devil.fusion_formulas() : []
    store.fusion_options = Array.isArray(formulas) ? formulas : []
  }

  const update_builder = () => {
    const target = builder_target.value
    const formulas = target && target.devil && typeof target.devil.fission_formulas === 'function'
      ? target.devil.fission_formulas()
      : []
    store.builder_options = Array.isArray(formulas) ? formulas : []
  }

  const update_fusion = () => {
    const target = fusion_target.value
    const formulas = target && typeof target.fusion_formulas === 'function'
      ? target.fusion_formulas()
      : []
    store.fusion_options = Array.isArray(formulas) ? formulas : []
  }

  const builder_auto_costdown = (rarity, type) => {
    auto_costdown(builder_target.value, rarity, type)
    store.current_bom = null
  }

  const auto_costdown = (bom, rarity, type) => {
    if (bom && bom.devil.rarity > rarity) {
      let boms = []
      bom.devil.fission_formulas().forEach(option => {
        boms = boms.concat(option.boms)
      })
      boms = boms.filter(item => item.auto)
      boms.sort((bom1, bom2) => {
        const cost1 = type ? bom1.getCost(rarity) : bom1.getCostPure(rarity)
        const cost2 = type ? bom2.getCost(rarity) : bom2.getCostPure(rarity)
        return cost1 - cost2
      })
      if (boms.length > 0) {
        bom.set(boms[0])
      }
      if (type === 1) {
        auto_costdown(bom.child1, rarity, 0)
        auto_costdown(bom.child2, rarity, 0)
        auto_costdown(bom.child3, rarity, 0)
        auto_costdown(bom.child4, rarity, 0)
      } else {
        auto_costdown(bom.child1, rarity, type)
        auto_costdown(bom.child2, rarity, type)
        auto_costdown(bom.child3, rarity, type)
        auto_costdown(bom.child4, rarity, type)
      }
    }
  }

  onMounted(() => {
    initOrbs()
    tick()
    const intervalId = setInterval(() => tick(), 60000)
    onBeforeUnmount(() => clearInterval(intervalId))
  })

  return {
    updated_at,
    lang_options,
    down_grade_options,
    show_info_modal,
    orbs,
    currentRouteName,
    races,
    devils,
    skills,
    skillTypes,
    builder_target,
    builder_options,
    fusion_target,
    fusion_options,
    current_bom,
    info_devil,
    lang_value,
    down_grade,
    goRoute,
    listen,
    show_devil_info,
    update_builder,
    update_fusion,
    builder_auto_costdown,
    setBuilderTarget,
    setFusionTarget,
    setI18nLocale: setI18nLocaleValue
  }
}
