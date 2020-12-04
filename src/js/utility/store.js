import Vue from 'vue';
import Vuex from 'vuex';
import Resource from '../class/resource';
import devil_raw_data from '../data/devil_raw_data';
import skill_raw_data from '../data/skill_raw_data';

Vue.use(Vuex);

const _state = {
    builder_options:[],
    fusion_options:[]
};

const resource = new Resource(devil_raw_data, skill_raw_data);

const store = new Vuex.Store({
    state:{
        current_bom:0,
        info_devil:0,
        builder_target:0,
        builder_options:0,
        fusion_target:0,
        fusion_options:0
    },
    getters:{
        resource:() => resource,
        races:() => resource.races,
        devils:() => resource.devils,
        skills:() => resource.skills,
        skillTypes:() => resource.skillTypes,
        current_bom:state=>{
            state.current_bom;
            return _state.current_bom;
        },
        info_devil:state=>{
            state.info_devil;
            return _state.info_devil;
        },
        builder_target:state=>{
            state.builder_target;
            return _state.builder_target;
        },
        builder_options:state=>{
            state.builder_options;
            return _state.builder_options;
        },
        fusion_target:state=>{
            state.fusion_target;
            return _state.fusion_target;
        },
        fusion_options:state=>{
            state.fusion_options;
            return _state.fusion_options;
        },
    },
    mutations:{
        current_bom:(state,value)=>{
            state.current_bom++;
            _state.current_bom = value;
        },
        info_devil:(state, value)=>{
            state.info_devil++;
            _state.info_devil = value;
        },
        builder_target:(state, value)=>{
            state.builder_target++;
            _state.builder_target = value;
        },
        builder_options:(state, value)=>{
            state.builder_options++;
            _state.builder_options = value;
        },
        fusion_target:(state, value)=>{
            state.fusion_target++;
            _state.fusion_target = value;
        },
        fusion_options:(state, value)=>{
            state.fusion_options++;
            _state.fusion_options = value;
        }
    }

});

const mapState = function(states) {

    let res = {};
    
    states.forEach(name=>{

        if(typeof store._mutations[name] !== 'undefined'){

            res[name]={
                get:function(){
                    return this.$store.getters[name];
                },
                set:function(value){
                    this.$store.commit(name, value);
                }
            };
        }
        else{
            res[name]={
                get:function(){return this.$store.getters[name];}
            }
        }

    });

    return res;
};

export {mapState};

export default store;