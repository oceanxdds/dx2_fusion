<template>
    <div>
        <div v-for="(option,index) in options" :key="index">
            <div class="row no-gutters">
                <div class="col-12 p-2">
                    <h6 class="m-0">{{ option.name }}</h6>
                </div>
            </div>
            <devil-bom-list :boms="option.boms" :usage="usage" @listen="listen"></devil-bom-list>
        </div>
    </div>
</template>

<script>
import VueDevilBomList from './devil_bom_list.vue';

export default {
    components:{'devil-bom-list': VueDevilBomList},
    props:['options','usage'],
    methods:{
        listen:function(res){
            this.$emit('listen', res);
        }
    }
}
</script>
