<template>
    <b-card v-if="bom" no-body 
        :class="{'border-primary':bom.upgrade, 'border-danger':bom.downgrade,'border-dark':!(bom.upgrade||bom.downgrade)}"
        @click="click()">
        <div class="row no-gutters">
            <div v-for="(devil,index) in [bom.child1.devil,bom.child2.devil]" :key="index"
                class="col-6 p-2"
                :class="{'text-primary':bom.upgrade,'text-danger':bom.downgrade}"
                :style="{backgroundImage:'url(\'images/devil/'+devil.icon+'\')',cursor:usage=='builder'?'pointer':''}" 
                style="background-position:right;background-repeat:no-repeat;background-size:contain">
                    <div class="font-weight-bold">{{ devil.showName() }}</div>
                    <div class="small">{{ devil.showGrade() }} {{ devil.showRarity() }}</div>
            </div>
        </div>
        <div class="row no-gutters">
            <div class="col-6" v-for="(devil,index) in [bom.child3?bom.child3.devil:null,bom.child4?bom.child4.devil:null]" 
                :key="index">
                <div v-if="devil" 
                    class="p-2" 
                    :class="{'text-primary':bom.upgrade,'text-danger':bom.downgrade}"
                    style="background-position:right;background-repeat:no-repeat;background-size:contain"
                    :style="{backgroundImage:'url(\'images/devil/'+devil.icon+'\')',cursor:usage=='builder'?'pointer':''}">
                    <div class="font-weight-bold">{{ devil.showName() }}</div>
                    <div class="small">{{ devil.showGrade() }} {{ devil.showRarity() }}</div>
                </div>
            </div>
        </div>
        <b-card-footer class="p-1 text-right">
            <b-button variant="info" size="sm" @click.stop="info(bom.child1.devil)" class="font-weight-bold small py-0">⚝</b-button>
            <b-button variant="info" size="sm" @click.stop="info(bom.child2.devil)" class="font-weight-bold small py-0">⚝</b-button>
            <span v-if="bom.mag_pure!=bom.mag">
                <b-badge variant="success"> {{ $t('archetype.common') }} </b-badge> 
                <span class="small"> {{ bom.showMagPure() }}  </span>
            </span>
            <span v-if="bom.mag>0">
                <b-badge variant="secondary"> MAG </b-badge> 
                <span class="small">{{ bom.showMag() }} </span>
            </span>
        </b-card-footer>
    </b-card>
</template>

<script>
export default {
    props:['bom','usage'],
    methods:{
        listen:function(res){

            this.$emit('listen', res);
        },
        click:function(){
            if(this.usage=='builder')
                this.listen({name:'choose_bom', value:this.bom})
        },
        info:function(devil){
            this.listen({name:'info', value:devil});
        }
    }
}
</script>

    