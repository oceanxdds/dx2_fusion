<template>
    <div class="row no-gutters">
        <div class="col-12 col-md-6 col-lg-4 col-xl-3 p-2" v-for="(devil,index) in devils" :key="index">
            
            <devil :devil="devil" :usage="usage" :skill="skill" @listen="listen">
                <b-button v-if="devil.fusionAsMaterial" variant="secondary" size="sm" @click="fusion(devil)" class="font-weight-bold small">{{ $t('message.normal_fusion') }}</b-button>
                <b-button v-if="devil.fusion" variant="warning" size="sm" @click="start_bom(devil)" class="font-weight-bold small">{{ $t('message.reverse_fusion') }}</b-button>
            </devil>

        </div>
    </div>
</template>

<script>
import VueDevil from './devil.vue';

export default {
    components:{'devil':VueDevil},
    props:['devils','usage','skill'] ,
    methods:{
        listen:function(res){
            this.$emit('listen', res);
        },
        fusion:function(devil){

            this.listen({name:'fusion', value:devil});
        },
        start_bom:function(devil){

            this.listen({name:'start_bom', value:devil});
        },
    }
}
</script>
    