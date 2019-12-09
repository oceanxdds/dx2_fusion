<script>

import {mapState} from './store';
import {getCookie, setCookie} from './utility';
import VueDevil from './components/devil.vue';
import VueSkillList from './components/skill_list.vue';
import VueDevilList from './components/devil_list.vue';
import VueDevilBomBuilder from './components/devil_bom_builder.vue';
import VueDevilBomOptions from './components/devil_bom_options.vue';
import VueDevilInfo from './components/devil_info.vue';

export default {

    components:{
        'devil': VueDevil,
        'skill-list': VueSkillList,
        'devil-list': VueDevilList,
        'devil-bom-builder': VueDevilBomBuilder,
        'devil-bom-options': VueDevilBomOptions,
        'devil-info': VueDevilInfo
    },
    data:function(){
        return {

        updated_at:'191209',
        //modal
        modal_id:'modal_devil_info',
        //builder
        builder_rarity_options:[],
        //fusion
        fusion_rarity_options:[],        
        //setting
        //lang_value:'ja',
        cache_lang_value:'ja',
        lang_options:[
            {text:'日本語', value:'ja'},
            {text:'繁體中文', value:'tw'},
            {text:'English', value:'en'}
        ],
        cache_down_grade:'0',
        down_grade_options:[
            {text: 'message.allow', value:'1'},
            {text: 'message.deny', value:'0'}
        ],
        cache_prevent_unload:'0',
        prevent_unload_options:[
            {text: 'message.allow', value:'1'},
            {text: 'message.deny', value:'0'}
        ],
        //router
        race_id:0,
        skillType_id:0,
        index_main:0,
        index_main_last:0,
        index_fusion:0,
        index_fusion_last:0,
        input_keyword:'',
        keyword:'',
        keyword_timer:null,
        searchBar:false,
        //orb
        now:null,
        orbs:[
            {'name':'ライト', icon:'images/theme/light.png', state:false, days:[0,1,3,5,6]},
            {'name':'ダーク', icon:'images/theme/dark.png', state:false, days:[0,1,3,5,6]},
            {'name':'ニュートラル', icon:'images/theme/natural.png', state:false, days:[0,1,2,3,4,5,6] },
            {'name':'ロー', icon:'images/theme/law.png', state:false, days:[0,2,4,6]},
            {'name':'カオス', icon:'images/theme/chaos.png', state:false, days:[0,2,4,6]}
        ],
    }},
    created:function(){

        let myApp = this;

        //prepare data
        for(let i = 1; i<=5;i++){
            for(let j=i; j<=5; j++){
                let text = (i+'+'+j);
                this.builder_rarity_options.push({text:text, state:true, active:false});
                this.fusion_rarity_options.push({text:text, state:true, active:false});
            }
        }

        //Lang
        this.lang_value = window.location.hash 
            ? window.location.hash.substring(1)
            : getCookie('lang_value'); 

        //allow down grade
        this.down_grade = getCookie('allow_down_grade');

        //prevent unload
        this.prevent_unload = getCookie('allow_prevent_unload');

        //Orbs
        let now = new Date();
        let utc = now.getTime() + now.getTimezoneOffset() * 60000;
        this.now = new Date( utc + 9 * 3600000 );

        myApp.tick();
        setInterval(()=>{ myApp.tick(); },60000);
    },
    watch:{

        input_keyword:function(){
            
            let myApp = this;

            clearTimeout(this.keyword_timer);

            this.keyword_timer = setTimeout(function(){
                myApp.keyword = myApp.input_keyword;
            },1000);
        }
    },
    computed:{
        ...mapState([
            'resource','devils','races','skillTypes','skills',
            'builder_target','info_devil','builder_options','current_bom',
            'fusion_target','fusion_options'
            ]),
        lang_value:{
            get:function(){
                
                return this.cache_lang_value;
            },
            set:function(value){
         
                if(this.lang_options.map(x=>x.value).includes(value)){
                    
                    this.cache_lang_value = value;
                    setCookie('lang_value', value);
                    
                    this.$i18n.locale = value;
                }
            }
        },
        down_grade:{

            get:function(){

                return this.cache_down_grade;
            },
            set:function(value){

                if(this.down_grade_options.map(x=>x.value).includes(value)){
                    
                    this.cache_down_grade = value;
                    setCookie('allow_down_grade', value);

                    this.update_builder_filter();
                    this.update_fusion_filter();
                }
            }
        },
        prevent_unload:{
          
            get:function(){

                return this.cache_prevent_unload;
            },
            set:function(value){

                if(this.prevent_unload_options.map(x=>x.value).includes(value)){
                    
                    this.cache_prevent_unload = value
                    setCookie('allow_prevent_unload', value);
                }
            }
        },
        devils_by_race:function(){

            if(this.race_id >= this.races.length)
                this.race_id = this.races.length-1;

            return this.races[this.race_id].devils;
        },
        skills_by_type:function(){

            if(this.skillType_id >= this.skillTypes.length)
                this.skillType_id = this.skillType.length-1;

            return this.skillTypes[this.skillType_id].skills;
        },
        filtered_devils: function(){

            var keyword = this.keyword.replace(/[!@#$%^&*()-=_+\[\]{}|\\]/g,'');

            var result = [];

            if(keyword){
                keyword = new RegExp(keyword, 'i');
                result = this.devils.filter( d => d.name.match(keyword)||d.name_tw.match(keyword)||d.name_en.match(keyword) );
            }

            return result;
        },
        filtered_skills: function(){

            var keyword = this.keyword.replace(/[!@#$%^&*()-=_+\[\]{}|\\]/g,'');

            var result = [];

            if(keyword){
                keyword = new RegExp(keyword, 'i');
                result = this.skills.filter( s => s.name.match(keyword)||s.name_tw.match(keyword)||s.name_en.match(keyword) );
            }

            return result;
        },
        filtered_builder_options:function(){

            let options = [];
            let filters = this.builder_rarity_options.filter( opt => opt.active && opt.state);
            let down_grade = this.down_grade;

            this.builder_options.forEach( option => {

                let boms = option.boms.filter( bom => {
                    
                    let r = bom.devil.rarity;
                    let [r1,r2] = [bom.child1.devil.rarity,bom.child2.devil.rarity].sort( (a,b) => (a-b) );
                    
                    return ( down_grade=='1' || (r>=r1&&r>=r2) )
                        ? filters.filter( filter => filter.text==r1+'+'+r2 ).length > 0
                        : false;
                });

                if(boms.length)
                    options.push({name:option.name,boms:boms});
            });

            return options;
        },
        filtered_fusion_options:function(){

            let options = [];
            let filters = this.fusion_rarity_options.filter( opt => opt.active && opt.state);
            let down_grade = this.down_grade;

            this.fusion_options.forEach( option => {

                let formulas = [];
                
                option.formulas.forEach( formula =>{

                    let boms = formula.boms.filter( bom => {
                    
                        let r = bom.devil.rarity;
                        let [r1,r2] = [bom.child1.devil.rarity,bom.child2.devil.rarity].sort( (a,b) => (a-b) );
                        let text = r1+'+'+r2;

                        return ( down_grade=='1' || (r>=r1&&r>=r2) ) 
                            ? filters.filter( filter => filter.text==text ).length > 0
                            : false;
                    });

                    if(boms.length){
                        formulas.push({name:formula.name,boms:boms});
                    }
                });

                if(formulas.length){
                    options.push({devil:option.devil,formulas:formulas,active:false});
                }
            });
            
            return options;
        }
    },
    methods:{
        
        listen:function(res){
            switch(res.name){
                case 'info': this.show_devil_info(res.value); break;
                case 'start_bom': this.start_bom(res.value); break;
                case 'fusion': this.fusion(res.value); break;
                case 'list_bom': this.list_bom(res.value);break;
                case 'reset_bom': this.reset_bom(res.value);break;
                case 'choose_bom': this.choose_bom(res.value);break;
            }
        },
        tick:function(){

            let day = this.now.getDay();
            this.orbs.forEach(orb=>{
               orb.state = orb.days.includes(day);
            });
        },
        show_devil_info:function(devil){
            
            this.info_devil = devil;
            this.$bvModal.show(this.modal_id);
        },
        searchFocus:function(){
            this.route('search',true);
        },
        searchBlur:function(){
            if(!this.keyword)
                this.route('last');
        },
        route:function(name, skip_update_last){
            
            var index_main = this.index_main;
            var index_fusion = this.index_fusion;

            switch(name){
                case 'fusion.devil':    index_main = 0; index_fusion = 0;   break;
                case 'fusion.fission':  index_main = 0; index_fusion = 1;   break;
                case 'fusion.fusion':   index_main = 0; index_fusion = 2;   break;
                case 'skill':           index_main = 1;                     break;
                case 'customize':       index_main = 2;                     break;
                case 'search':          index_main = 3;                     break;
                case 'setting':         index_main = 4;                     break;
                case 'last':            index_main = this.index_main_last;
                                        index_fusion = this.index_fusion_last;  break;
                default:                index_main = 0; index_fusion = 0;   break;
            }

            if(!skip_update_last){
                this.index_main_last = index_main;
                this.index_fusion_last = index_fusion;
            }

            this.index_main = index_main;
            this.index_fusion = index_fusion;
        },
        isRoute:function(name){
            
            var index_main = this.index_main;
            var index_fusion = this.index_fusion;

            switch(name){
                case 'home':            index_main = 0; index_fusion = 0;   break;
                case 'fusion.devil':    index_main = 0; index_fusion = 0;   break;
                case 'fusion.fission':  index_main = 0; index_fusion = 1;   break;
                case 'fusion.fusion':   index_main = 0; index_fusion = 2;   break;
                case 'skill':           index_main = 1;                     break;
                case 'customize':       index_main = 2;                     break;
                case 'search':          index_main = 3;                     break;
                case 'setting':         index_main = 4;                     break;
                default:                index_main = 0; index_fusion = 0;   break;
            }

            return index_main == this.index_main && index_fusion == this.index_fusion;
        },
        start_bom: function(devil){

            this.update_current_bom(this.builder_target = devil.bom());
            this.route('fusion.fission');
        },
        list_bom: function(bom){

            this.update_current_bom(this.current_bom==bom?null:bom);
        },
        choose_bom: function(bom){

            this.current_bom.set(bom);
            this.update_current_bom(null);
        },
        reset_bom:function(bom){

            bom.unset();
            this.update_current_bom(null);
        },
        update_current_bom:function(bom){

            this.current_bom = bom;
            this.update_builder();
        },
        update_builder:function(){

            this.builder_options = this.current_bom ? this.current_bom.devil.fission_formulas() : [];
            this.update_builder_filter();
        },
        update_builder_filter:function(){
            
            let combs = {};
            let down_grade = this.down_grade;

            this.builder_options.forEach( option => {
                option.boms.forEach( bom => {

                    let r = bom.devil.rarity;
                    let [r1,r2] = [bom.child1.devil.rarity,bom.child2.devil.rarity].sort( (a,b) => (a-b) );
                    let text = r1+'+'+r2;

                    if( down_grade=='1' || (r>=r1&&r>=r2) ){
                        combs[text] = text;
                    }
                });
            });
            
            this.builder_rarity_options.forEach( option =>　{ option.active = option.state = (option.text in combs) });
        },
        builder_rarity_option_click:function(option){

            let filters = this.builder_rarity_options.filter( opt => opt.active );
            let still_stands = filters.filter( opt => opt.state );

            //one choice, no choice
            if(filters.length==1){
                return false;
            }
            //all stand (first down), then all down but u
            else if(still_stands.length==filters.length){
                filters.forEach(opt=>{ opt.state = (opt==option) });
            } 
            //only u stand and is current (last down), then all stand
            else if(still_stands.length == 1 && still_stands[0] == option){
                filters.forEach(opt=>{opt.state=true});
            }
            else{
            //otherwise, inverse state
                option.state = !option.state;
            }
        },
        fusion: function(devil){

            this.fusion_target = devil;
            this.update_fusion();
            this.route('fusion.fusion');
        },
        update_fusion:function(){

            this.fusion_options = this.fusion_target ? this.fusion_target.fusion_formulas() : [];
            this.update_fusion_filter();
        },
        update_fusion_filter: function(){

            let combs = {};
            let down_grade = this.down_grade;
            
            this.fusion_options.forEach( option => {
                option.formulas.forEach( formula => {
                    formula.boms.forEach( bom => {

                        let r = bom.devil.rarity;
                        let [r1,r2] = [bom.child1.devil.rarity,bom.child2.devil.rarity].sort( (a,b) => (a-b) );
                        let text = r1+'+'+r2;

                        if( down_grade=='1' || (r>=r1&&r>=r2) ){
                            combs[text] = text;
                        }
                    });
                });
            });
            
            this.fusion_rarity_options.forEach( option => { option.active = option.state = ( option.text in combs) });
        },
        fusion_rarity_option_click:function(option){

            let filters = this.fusion_rarity_options.filter( opt => opt.active );
            let still_stands = filters.filter( opt => opt.state );

            //one choice, no choice
            if(filters.length==1){
                return false;
            }
            //all stand (first down), then all down but u
            else if(still_stands.length==filters.length){
                filters.forEach(opt=>{ opt.state = (opt==option) });
            } 
            //only u stand and is current (last down), then all stand
            else if(still_stands.length == 1 && still_stands[0] == option){
                filters.forEach(opt=>{opt.state=true});
            }
            else{
            //otherwise, inverse state
                option.state = !option.state;
            }
        },
        builder_auto_costdown:function(rarity, type){
            
            this.auto_costdown(this.builder_target, rarity, type);
            this.update_current_bom(null);
        },
        auto_costdown: function(bom, rarity, type){

            if(bom && bom.devil.rarity>rarity){

                let boms = [];

                bom.devil.fission_formulas().forEach( option => {
                    boms = boms.concat(option.boms);
                });

                boms = boms.filter( x => x.auto );

                boms.sort( (bom1, bom2) => {
                    let cost1 = type ? bom1.getCost(rarity) : bom1.getCostPure(rarity);
                    let cost2 = type ? bom2.getCost(rarity) : bom2.getCostPure(rarity);
                    return cost1 - cost2;
                });

                if(boms.length>0){
                    bom.set(boms[0]);
                }
                
                if(type==1){
                    //雜體
                    //var type1 = bom.pure_child == 1 ? 0 : 1;
                    //var type2 = bom.pure_child == 2 ? 0 : 1;
                    type1=0; //TODO
                    type2=0; //TODO
                    this.auto_costdown(bom.child1, rarity, type1);
                    this.auto_costdown(bom.child2, rarity, type2);
                    this.auto_costdown(bom.child3, rarity, type2);
                    this.auto_costdown(bom.child4, rarity, type2);
                }
                else{
                    //純素體
                    this.auto_costdown(bom.child1, rarity, type);
                    this.auto_costdown(bom.child2, rarity, type);
                    this.auto_costdown(bom.child3, rarity, type);
                    this.auto_costdown(bom.child4, rarity, type);
                }
            }
        }
    }
};

</script>

<style>
.mw-1920{
    max-width: 1920px;
}
</style>


<template>
    
<div>
    <div class="container-fluid px-0 mw-1920">
        <b-navbar toggleable="md" type="dark" variant="info">

            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand href="#" @click="route('home')" class="d-none d-md-block">Dx2</b-navbar-brand>
            <b-navbar-brand href="#" @click="searchBar=!searchBar" class="d-block d-md-none">{{ $t('message.search') }}</b-navbar-brand>
            
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item href="#" @click="route('fusion.devil')" :active="isRoute('fusion.devil')">{{ $t('message.devil') }}</b-nav-item>
                    <b-nav-item href="#" @click="route('fusion.fission')" :active="isRoute('fusion.fission')">{{ $t('message.reverse_fusion') }}</b-nav-item>
                    <b-nav-item href="#" @click="route('fusion.fusion')" :active="isRoute('fusion.fusion')">{{ $t('message.normal_fusion') }}</b-nav-item>
                    <b-nav-item href="#" @click="route('skill')" :active="isRoute('skill')">{{ $t('message.skill') }}</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-form action="#" class="d-none d-md-block">
                        <b-form-input v-model="input_keyword" type="text" :placeholder="$t('message.search')" @focus="searchFocus()" @blur="searchBlur()"></b-form-input>
                    </b-nav-form>
                    <b-nav-item href="#" @click="route('setting')" :active="isRoute('setting')">{{ $t('message.setting') }}</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <b-tabs v-model="index_main" nav-wrapper-class="d-none">
            <div class="d-block d-md-none p-2 bg-info" v-if="searchBar">
                <b-form-input v-model="input_keyword" type="text" :placeholder="$t('message.search')" @focus="searchFocus()" @blur="searchBlur()"></b-form-input>
            </div>

            <!-- index_main : 0 -->

            <b-tab no-body>

                <b-card no-body class="border-0">
                    <b-tabs card v-model="index_fusion" nav-wrapper-class="d-block d-md-none" content-class="p-2">

                        <!-- index_fusion : 0 // devil-->

                        <b-tab :title="$t('message.devil')" no-body>
                            <b-card no-body>
                                <b-tabs pills card v-model="race_id" content-class="d-none">
                                    <b-tab :title="race.showName()" v-for="(race,index) in races" :key="index" :title-link-class="{'font-weight-bold':race.highlight}"></b-tab>
                                </b-tabs>
                                <devil-list :devils="devils_by_race" usage="fission" @listen="listen"></devil-list>
                            </b-card>
                        </b-tab>

                        <!-- index_fusion : 1 // fission/builder-->

                        <b-tab :title="$t('message.reverse')" no-body>
                            <b-card no-body v-if="builder_target">
                                <b-list-group flush>
                                    <b-list-group-item class="p-2">
                                        <div class="row align-items-center">
                                            <div class="col-auto">
                                                <h5><b-badge variant="secondary"> Total MAG </b-badge> {{ builder_target.showTotalMagPure() }} ~ {{ builder_target.showTotalMag() }} </h5>
                                            </div>
                                            <div class="col-12 col-md-auto">
                                                <b-button class="m-1" size="sm" variant="success" @click="builder_auto_costdown(4,0)" v-if="builder_target&&builder_target.devil&&builder_target.devil.rarity>4">素★4</b-button>
                                                <b-button class="m-1" size="sm" variant="success" @click="builder_auto_costdown(3,0)" v-if="builder_target&&builder_target.devil&&builder_target.devil.rarity>3">素★3</b-button>
                                                <b-button class="m-1" size="sm" variant="success" @click="builder_auto_costdown(2,0)" v-if="builder_target&&builder_target.devil&&builder_target.devil.rarity>2">素★2</b-button>
                                                <b-button class="m-1" size="sm" variant="success" @click="builder_auto_costdown(1,0)" v-if="builder_target&&builder_target.devil&&builder_target.devil.rarity>1">素★1</b-button>
                                                <!--
                                                <b-button class="m-1" size="sm" variant="warning" @click="builder_auto_costdown(4,1)">雜★4</b-button>
                                                <b-button class="m-1" size="sm" variant="warning" @click="builder_auto_costdown(3,1)">雜★3</b-button>
                                                -->
                                            </div>
                                        </div>
                                    </b-list-group-item>

                                    <b-list-group-item class="p-2">
                                        <devil-bom-builder :bom="builder_target" :parent_bom="null" usage="builder" @listen="listen" source=""></devil-bom-builder>
                                    </b-list-group-item>

                                    <b-list-group-item class="p-0" v-if="builder_options.length">
                                        <div class="row no-gutters justify-content-center">
                                            <div class="col-auto p-1" v-for="(option,index) in builder_rarity_options.filter(x=>x.active)" :key="index">
                                                <b-button :pressed="option.state"
                                                    @click="builder_rarity_option_click(option)"
                                                    variant="outline-secondary">
                                                    {{ option.text }}
                                                </b-button>
                                            </div>
                                        </div>
                                    </b-list-group-item>

                                    <b-list-group-item class="p-0" v-if="filtered_builder_options.length>0">
                                        <devil-bom-options :options="filtered_builder_options" usage="builder" @listen="listen"></devil-bom-options>
                                    </b-list-group-item>

                                </b-list-group>
                            </b-card>
                        </b-tab>

                        <!-- index_fusion : 2 // fusion-->

                        <b-tab :title="$t('message.normal')" no-body>

                            <b-card no-body v-if="fusion_target">
                                <b-list-group flush>
                                    <b-list-group-item class="p-2" v-if="fusion_options.length">
                                        <div class="row no-gutters justify-content-center">
                                            <div class="col-auto p-1"
                                            v-for="(option,index) in fusion_rarity_options.filter(x=>x.active)" :key="index"> 
                                                <b-button :pressed="option.state" 
                                                    @click="fusion_rarity_option_click(option)"
                                                    variant="outline-secondary">
                                                    {{ option.text }}
                                                </b-button>
                                            </div>
                                        </div>
                                    </b-list-group-item>    
                                    <b-list-group-item class="p-2" v-if="filtered_fusion_options.length">

                                        <div class="row no-gutters">
                                            <div v-for="(option, index) in filtered_fusion_options" :key="index"
                                                class="col-12 col-md-6 col-lg-4 col-xl-3">

                                                <div class="row no-gutters">
                                                    <div class="col-12 p-2">
                                                        <devil :devil="option.devil" usage="fusion" style="cursor:pointer"
                                                            v-b-toggle="'fusion_'+index" @listen="listen">
                                                        </devil>
                                                    </div>
                                                </div>
                
                                                <b-collapse :id="'fusion_'+index" accordion="fusion_accrodion" class="p-2">
                                                    <b-card no-body style="background-color:#eee">
                                                        <devil-bom-options :options="option.formulas" usage="fusion" @listen="listen"></devil-bom-options>
                                                    </b-card>
                                                </b-collapse>

                                            </div>
                                            
                                        </div>
                                        
                                    </b-list-group-item>
                                </b-list-group>
                            
                            </b-card>

                        </b-tab>
                        

                    </b-tabs>
                </b-card>
            </b-tab>

            <!-- index_main : 1 // skill-->

            <b-tab no-body class="p-2">

                <b-card no-body>
                    <b-tabs pills card v-model="skillType_id" content-class="d-none">
                        <b-tab :title="type.showName()" v-for="(type,index) in skillTypes" :key="index"></b-tab>
                    </b-tabs>

                    <skill-list :skills="skills_by_type" @listen="listen"></skill-list>
                </b-card>

            </b-tab>

            <!-- index_main : 2 // customize-->

            <b-tab no-body class="p-2"></b-tab>

            <!-- index_main : 3 // search-->

            <b-tab no-body class="p-2">
                
                <b-card no-body class="mt-2" v-if="filtered_devils.length>0">
                    <devil-list :devils="filtered_devils" usage="fission" @listen="listen"></devil-list>
                </b-card>

                <b-card no-body class="mt-2" v-if="filtered_skills.length>0">
                    <skill-list :skills="filtered_skills" @listen="listen"></skill-list>
                </b-card>

            </b-tab>

            <!-- index_main : 4 // setting-->

            <b-tab no-body class="p-2">
            
                <div class="row no-gutters" style="background:url('images/theme/steven.png') no-repeat right center; background-size:auto 300px">
                    <div class="col-12 py-2">
                        <div class="font-weight-bold py-2">{{ $t('message.language') }}</div>
                        <div>
                            <b-form-radio-group
                                buttons
                                button-variant="outline-info"
                                v-model="lang_value"
                                :options="lang_options">
                            </b-form-radio-group>
                        </div>
                    </div>
                    <div class="col-12 py-2">
                        <div class="font-weight-bold py-2">{{ $t('message.downgrade_fusion') }}</div>
                        <div>
                            <b-form-radio-group
                                buttons
                                button-variant="outline-info"
                                v-model="down_grade">
                                <b-form-radio :value="option.value" v-for="(option,index) in down_grade_options" :key="index">
                                    {{ $t(option.text) }}
                                </b-form-radio>
                            </b-form-radio-group>
                        </div>
                    </div>
                    <div class="col-12 py-2">
                        <div class="font-weight-bold py-2">{{ $t('message.prevent_unload') }}</div>
                        <div>
                            <b-form-radio-group
                                buttons
                                button-variant="outline-info"
                                v-model="prevent_unload">
                                <b-form-radio :value="option.value" v-for="(option,index) in prevent_unload_options" :key="index">
                                    {{ $t(option.text) }}
                                </b-form-radio>
                            </b-form-radio-group>
                        </div>
                    </div>
                    <div class="col-12 py-2">
                        <div class="p-1 border rounded text-center" style="background-color:rgba(200, 200, 200, 0.5);">
                            <div class="small">
                            君は私が作った悪魔召喚プログラムを使ってるね<br>
                            もし君が秩序にも混沌にも偏らず<br>
                            中庸の道を往くのなら<br>
                            私が僅かばかりだが協力してあげよう<br><br>
                            人間が持つ価値を　可能性を　私に証明してくれ<br><br>
                            スティーヴン・ホーキング (1942-2018)
                            </div>
                        </div>
                    </div>
                </div>
                   
            </b-tab>
        
        </b-tabs>

    </div>
    
    <!-- footer -->
    <div class="container-fluid mw-1920">
        <div class="d-flex">
            <div class="mr-1 flex-grow-1">
                <img v-for="(orb,index) in orbs.filter(x=>x.state)" :key="index" :src="orb.icon" style="width:30px">
            </div>
            <div class="mx-1">
                <a href="https://tl.hkrev.info/en/police-timeline/" target="_blank">
                    <img src="images/theme/hkdm-32px.png" title="Hong Kong Democratic Movement">
                </a>
            </div>
            <div class="ml-1">
                <a href="https://github.com/oceanxdds/dx2_fusion" target="_blank">
                    <img src="images/theme/GitHub-Mark-32px.png" alt="GitHub">
                </a>
            </div>  
        </div>
    </div>
    <div class="container-fluid mw-1920 mb-3">
        <div class="d-flex justify-content-end">
            <div class="p-1">
                <span class="small">Version: {{ updated_at }}</span>
            </div>  
        </div>
    </div>

    <!-- Modal -->
    <devil-info :id="modal_id"></devil-info>

</div>
    
</template>