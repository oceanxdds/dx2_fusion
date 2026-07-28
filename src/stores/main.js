import { markRaw } from 'vue'
import { defineStore } from 'pinia'
import Resource from '../class/resource'
import Cookie from '../utility/cookie'
import races_raw_data from '../data/races'
import devils_raw_data from '../data/devils'
import skill_types_raw_data from '../data/skill_types'
import skills_raw_data from '../data/skills'

// This is static game reference data loaded once and never mutated in place —
// mark it (and the flattened arrays that alias into it) raw so Vue doesn't
// deep-proxy the whole devil/race/skill graph. markRaw only affects the exact
// object it's given, not nested properties, so each alias needs its own call.
const resource = new Resource(races_raw_data, devils_raw_data, skill_types_raw_data, skills_raw_data)
markRaw(resource)
markRaw(resource.races)
markRaw(resource.devils)
markRaw(resource.skills)
markRaw(resource.skillTypes)

export const useMainStore = defineStore('main', {
    state: () => ({
        resource: resource,
        races: resource.races,
        devils: resource.devils,
        skills: resource.skills,
        skillTypes: resource.skillTypes,
        current_bom: null,
        info_devil: null,
        builder_target: null,
        builder_options: [],
        fusion_target: null,
        fusion_options: [],
        down_grade: Cookie.getItem('allow_down_grade') || '0',
        lang_value: Cookie.getItem('lang_value') || 'ja'
    }),
    getters: {
        builderOptionsSource: state => {
            if (Array.isArray(state.builder_options) && state.builder_options.length) {
                return state.builder_options
            }
            if (state.builder_target && state.builder_target.devil && typeof state.builder_target.devil.fission_formulas === 'function') {
                return state.builder_target.devil.fission_formulas()
            }
            return []
        },
        fusionOptionsSource: state => {
            if (Array.isArray(state.fusion_options) && state.fusion_options.length) {
                return state.fusion_options
            }
            if (state.fusion_target && typeof state.fusion_target.fusion_formulas === 'function') {
                return state.fusion_target.fusion_formulas()
            }
            return []
        }
    }
})
