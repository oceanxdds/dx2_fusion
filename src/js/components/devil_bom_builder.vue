<template>
    <div v-if="bom">
        <div class="row no-gutters justify-content-md-center pt-1">
            <div class="col-auto col-md align-self-center pr-md-1">
                <hr v-if="bom.parent?!bom.parent.isFirstBom(bom):false">
            </div>
            <div class="col-auto item">
                <devil :devil="bom.devil" usage="builder" :source="source" @listen="listen"
                    :class="{'bg-warning':isCurrent(), 'text-primary':isParentCurrent()}"
                    :style="{'min-width':(source=='multi_fusion'?'60px':'130px')}"
                    v-b-popover.hover.top="bom.devil.race.showName()+' '+bom.devil.showName()+'\n'+$t('message.fusion_mag_others')+': '+bom.showMag()+'\n'+$t('message.fusion_mag_pure')+': '+bom.showMagPure()">
                </devil>
            </div>
            <div class="col-auto col-md align-self-center pl-1">
                <div class="row no-gutters">
                    <div class="col-auto pr-1" v-if="isCurrent()">
                        <b-button variant="info" size="sm" @click.stop="info()" class="font-weight-bold">⚝</b-button>
                    </div>
                    <div class="col-auto" v-if="isResettable()">
                        <b-button size="sm" @click="reset_bom()" class="">✕</b-button>
                    </div>
                    <div class="col-auto" v-if="!isCurrent()&&(bom.child1||bom.child2)">
                        <b-button size="sm" @click="toggle()" class="">{{ collapsed_sign }}</b-button>
                    </div>
                    <div class="col align-self-center">
                        <hr v-if="bom.parent?!bom.parent.isLastBom(bom):false">
                    </div>
                </div>
            </div>
            
        </div>
        <div class="row no-gutters justify-content-md-center" v-if="!collapsed">
            <div class="col-12 col-md-auto pl-3 pl-md-0 border-left-md-none" v-if="bom.child1">
                <devil-bom-builder :bom="bom.child1" @listen="listen" :parent_bom="bom" :source="(source=='multi_fusion'||bom.devil.source=='multi_fusion')?'multi_fusion':''"></devil-bom-builder>
            </div>
            <div class="col-12 col-md-auto pl-3 pl-md-0 border-left-md-none" v-if="bom.child2">
                <devil-bom-builder :bom="bom.child2" @listen="listen" :parent_bom="bom" :source="(source=='multi_fusion'||bom.devil.source=='multi_fusion')?'multi_fusion':''"></devil-bom-builder>
            </div>
            <div class="col-12 col-md-auto pl-3 pl-md-0 border-left-md-none" v-if="bom.child3">
                <devil-bom-builder :bom="bom.child3" @listen="listen" :parent_bom="bom" :source="(source=='multi_fusion'||bom.devil.source=='multi_fusion')?'multi_fusion':''"></devil-bom-builder>
            </div>
            <div class="col-12 col-md-auto pl-3 pl-md-0 border-left-md-none" v-if="bom.child4">
                <devil-bom-builder :bom="bom.child4" @listen="listen" :parent_bom="bom" :source="(source=='multi_fusion'||bom.devil.source=='multi_fusion')?'multi_fusion':''"></devil-bom-builder>
            </div>
        </div>
    </div>
</template>

<style>
@media (max-width: 767.98px) {
    .border-left-md-none{
        border-left:1px solid #dee2e6;
    }
}
</style>


<script>
import {mapGetters} from 'vuex';
import VueDevil from './devil.vue';

export default {
    name:'devil-bom-builder',
    components:{
        'devil': VueDevil,
    },
    props:['bom','parent_bom','source'],
    data:function(){
        return {
            collapsed: false
        }
    },
    methods:{
        listen:function(res){
            
            if(res.name=="list_bom" && res.value==null)
                res.value = this.bom;
 
            this.$emit('listen', res);
        },
        reset_bom:function(){

            this.listen({name:'reset_bom', value:this.bom});
        },
        info:function(){

            this.listen({name:'info', value:this.bom.devil});
        },
        toggle:function(){

            this.collapsed = !this.collapsed;
        },
        hasChild:function(){

            return this.bom.child1 || this.bom.child2;
        },
        isCurrent:function(){

            return this.bom ? this.bom == this.current_bom : false;
        },
        isParentCurrent:function(){

            return this.parent_bom ? this.parent_bom == this.current_bom : false;
        },
        isResettable:function(){

            return ( this.bom.child1 || this.bom.child2 ) && (this.bom ? this.bom == this.current_bom : false);
        }
    },
    computed:{
        collapsed_sign:function(){

            return this.collapsed ? '+' : '-';
        },
        ...mapGetters(['current_bom'])
    }
}
</script>
