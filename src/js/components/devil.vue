<template>
    <b-card no-body class="border-secondary">
        <!--
        <b-card-body class="p-2" @click="click"
            :style="{backgroundImage:'url(\'images/devil/'+devil.icon+'\')',cursor:(usage=='fission'||usage=='builder')?'pointer':''}" 
            style="background-position:right;background-repeat:no-repeat;background-size:contain">
            <div class="font-weight-bold">
                {{usage=='fusion'||usage=='fission'||usage=='info'||usage=='skill'?devil.race.showName():''}} {{ devil.showName() }}
            </div>
            <div class="small">
                {{ devil.showGrade() }} {{ devil.showRarity() }}
                <span class="ml-2" v-if="usage=='info'">AI: {{ $t('devil.'+devil.type) }}</span>
                <b-button v-if="usage=='fusion'||usage=='skill'" variant="info" size="sm" @click.stop="info()" class="font-weight-bold small py-0">⚝</b-button>
                <span v-if="usage=='skill'">
                    <b-badge class="ml-2" variant="success" v-if="isSkillAvailable(0)">{{ $t('message.possess') }}</b-badge>
                    <b-badge class="ml-2" variant="warning" v-if="isSkillAvailable(1)">{{ $t('message.inherit') }}</b-badge>
                </span>
            </div>
        </b-card-body>
        -->

        <b-card-body class="p-0" @click="click">
            <div v-if="!(usage=='builder'&&source=='multi_fusion')" class="p-2" :style="{backgroundImage:'url(\'images/devil/'+devil.icon+'\')',cursor:(usage=='fission'||usage=='builder')?'pointer':''}" 
                style="background-position:right;background-repeat:no-repeat;background-size:contain">
                <div class="font-weight-bold">
                    {{usage=='fusion'||usage=='fission'||usage=='info'||usage=='skill'?devil.race.showName():''}} {{ devil.showName() }}
                </div>
                <div class="small">
                    {{ devil.showGrade() }} {{ devil.showRarity() }}
                    <span class="ml-2" v-if="usage=='info'">AI: {{ $t('devil.'+devil.type) }}</span>
                    <b-button v-if="usage=='fusion'||usage=='skill'" variant="info" size="sm" @click.stop="info()" class="font-weight-bold small py-0">⚝</b-button>
                    <span v-if="usage=='skill'">
                        <b-badge class="ml-2" variant="success" v-if="isSkillAvailable(0)">{{ $t('message.possess') }}</b-badge>
                        <b-badge class="ml-2" variant="warning" v-if="isSkillAvailable(1)">{{ $t('message.inherit') }}</b-badge>
                    </span>
                </div>
            </div>
            <div v-if="usage=='builder'&&source=='multi_fusion'" class="p-1" :style="{backgroundImage:'url(\'images/devil/'+devil.icon+'\')',cursor:(usage=='fission'||usage=='builder')?'pointer':''}" 
                style="background-position:right;background-repeat:no-repeat;background-size:contain">
                <div class="small">
                    {{ devil.grade }}
                </div>
                <div class="small" style="writing-mode: vertical-rl;text-orientation: upright;">
                    ★{{ devil.rarity }}
                </div>
            </div>
        </b-card-body>

        <b-card-footer class="p-1" v-if="usage=='fission'">
            <slot></slot>
            <b-button variant="info" size="sm" @click.stop="info()" class="font-weight-bold small">⚝</b-button>
        </b-card-footer>

    </b-card>
</template>

<script>
export default {
    name:'devil',
    props:['devil','usage','skill','source'],
    methods:{
        listen:function(res){

            this.$emit('listen', res);
        },
        click:function()
        {
            if(this.usage=='fission')
            {
                if(this.devil.fusion)
                    this.listen({name:'start_bom', value:this.devil});
            }
            
            if(this.usage=='builder')
            {
                if(this.devil.fusion)
                    this.listen({name:'list_bom', value:null});
            }
            
        },
        info:function(){

            this.listen({name:'info', value:this.devil});
        },
        isSkillAvailable:function(inherit){

            if(inherit){
                return this.skill==this.devil.skills[0] ||
                    this.devil.skill5.indexOf(this.skill)>=0;
            }
            else{
                return this.skill==this.devil.skills[1] ||
                    this.skill==this.devil.skills[2] ||
                    this.devil.skill4.indexOf(this.skill)>=0;
            }
        }
    }
}
</script>