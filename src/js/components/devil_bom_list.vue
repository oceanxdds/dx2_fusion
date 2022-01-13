<template>
    <div class="row g-1">
        <div class="col-12 p-2" :class="{'col-md-6 col-lg-4 col-xl-3':usage!='fusion'}" v-for="(bom,index) in boms" :key="index">
            <devil-bom :bom="bom" :usage="usage" @listen="listen"></devil-bom>
        </div>
    </div>
</template>

<script>
import VueDevilBom from './devil_bom.vue'

export default {
    components:{'DevilBom': VueDevilBom },
    props:['boms','usage'],
    methods:{
        listen:function(res){
            this.$emit('listen', res);
        }
    }
}
</script>

    

    