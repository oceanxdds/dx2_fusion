<template>
    <div class="row no-gutters">
        <div class="col-12" v-for="(skill, index) in skills" :key="index"
            :class="{'col-md-6':!actives[index], 'col-lg-4':!actives[index], 'col-xl-3':!actives[index]}">
            <div class="row no-gutters">
                <div class="col-12 p-2"
                :class="{'col-md-6':actives[index], 'col-lg-4':actives[index], 'col-xl-3':actives[index]}">
                    <skill :skill="skill" v-b-toggle="'skill_'+index" style="cursor:pointer"></skill>
                </div>
            </div>
            <b-collapse :id="'skill_'+index" accordion="skill_accrodion" v-model="actives[index]" class="px-2">
                <b-card no-body>
                    <div class="row no-gutters">
                        <div class="col-12 p-2" v-for="(devil,index2) in skill.devils" :key="index2"
                        :class="{'col-md-6':actives[index], 'col-lg-4':actives[index], 'col-xl-3':actives[index]}">
                            <devil :devil="devil" usage="skill" @listen="listen" :skill="skill"></devil>
                        </div>
                    </div>
                </b-card>
            </b-collapse>
        </div>
    </div>
</template>

<script>
import VueSkill from './skill.vue'
import VueDevil from './devil.vue'

export default {
    components:{'skill':VueSkill, 'devil':VueDevil},
    props:['skills'] ,
    data:function(){
        return {
            actives:[]
        }
    },
    watch:{
        skills:function(){
            this.actives=[];
        }
    },
    methods:{
        listen:function(res){

            this.$emit('listen', res);
        }
    }
}
</script>