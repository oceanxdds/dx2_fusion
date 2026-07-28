import Race from './race'
import Devil from './devil'
import Skill from './skill'
import SkillType from './skill_type'

class Resource{
    
    constructor(races_raw_data, devils_raw_data, skill_types_raw_data, skills_raw_data){

        this.races = [];
        this.devils = [];
        this.skillTypes = [];
        this.skills = [];

        let race_data = {};
        let devil_data = {};
        let devil_array;
        let type_data = {};
        let skill_data = {};

        //Race

        let races = races_raw_data.map( race => {
            race = new Race(race);
            race_data[race.id] = race;
            return race;
        });

        //Devil (joined to its race via the race FK)

        devils_raw_data.forEach( raw_devil => {
            let devil = new Devil(raw_devil);
            let race = race_data[raw_devil.race];
            devil.race = race;
            race.devils.push(devil);
            devil_data[devil.id] = devil;
        });

        //Skill Type

        let skillTypes = skill_types_raw_data.map( type => {
            type = new SkillType(type);
            type_data[type.id] = type;
            return type;
        });

        //Skill (joined to its type via the type FK)

        skills_raw_data.forEach( raw_skill => {
            let skill = new Skill(raw_skill);
            let type = type_data[raw_skill.type];
            skill.type = type;
            type.skills.push(skill);
            skill_data[skill.id] = skill;
        });

        //Details

        races.forEach( race => {

            //Race
            race.formulas.forEach( formula => {
                formula[0] = race_data[formula[0]];
                formula[1] = race_data[formula[1]];
            });

            // devils_with_fusion below assumes each race's devils run grade-descending;
            // enforce that explicitly rather than relying on source-file ordering.
            race.devils.sort( (d1,d2) => d2.grade - d1.grade );

            //Devil
            race.devils.forEach( devil => {

                if(devil.source=='multi_fusion'){
                    devil.formula = devil.formula.map(id=>{
                        return devil_data[id];
                    });
                }

                [devil.skills,devil.skill4,devil.skill5] =
                [devil.skills,devil.skill4,devil.skill5].map( skill_list => {
                    return skill_list.map( id => {
                        return skill_data[id]
                            ? skill_data[id].addDevil(devil)
                            : new Skill({id:id});
                    });
                });
            });

            //devil's fusion property

            let devils_with_fusion = race.devils.filter(d=>d.fusion&&d.source=='normal_fusion');
            
            devils_with_fusion.forEach( (devil, index) => {

                devil.max = devil.grade;
                devil.min = (index==devils_with_fusion.length-1 ? 0 : devils_with_fusion[index+1].grade);
            });
        });

        //Race's usage (fusion options)

        races.forEach( r1 => {

            let usage_temp = {};

            races.forEach( r0 => {
                r0.formulas.forEach( f => {
                    
                    let r2 = f[0].id == r1.id ? f[1] : (f[1].id == r1.id ? f[0] : null) ;

                    if( ! r2 ) return;

                    usage_temp[r0.id] = (r0.id in usage_temp)
                        ? usage_temp[r0.id].concat(r2)
                        : [r2] ;
                });
            });

            r1.usage = [];

            Object.keys(usage_temp).forEach(id => {
                r1.usage.push({r0:race_data[id],r2s:usage_temp[id]});
            });
        });

        //devil's fission options

        devil_array = Object.values(devil_data).sort( (d1,d2) => (d1.grade - d2.grade) );

        devil_array.forEach( devil => {
            devil.fission_options = devil.fission_formulas();
            devil.fission_boms = devil.fission_options.flatMap( option => option.boms );
        });

        let break_limit=10;
        let all_pass = false;

        while( break_limit-- > 0 && !all_pass){

            all_pass = true;
            
            devil_array.forEach( devil => {

                let pass = true;

                for(let rarity=1; rarity<=5; rarity++){

                    let cost = null;
                    let pure_cost = null;

                    if(devil.fission_boms.length){
                        
                        devil.fission_boms.forEach( bom => {

                            if(!bom.auto)
                                return ;

                            let l_pure_cost = bom.getCostPure(rarity);
                            
                            if(l_pure_cost==null) pass = false;
                            else if(pure_cost==null) pure_cost = l_pure_cost;
                            else pure_cost = pure_cost > l_pure_cost ? l_pure_cost : pure_cost;

                            let l_cost = bom.getCost(rarity);
        
                            if(l_cost==null)    pass = false;
                            else if(cost==null) cost = l_cost;
                            else                cost = cost > l_cost ? l_cost : cost;
                        });

                        if(devil.rarity > rarity){
        
                            if(pure_cost!=null && devil.pure_costs[rarity] != pure_cost){
                                devil.pure_costs[rarity] = pure_cost;
                                pass = false;
                            }

                            if(cost!=null && devil.costs[rarity] != cost){
                                devil.costs[rarity] = cost;
                                pass = false;
                            }
                        }
                        else{
                            devil.pure_costs[rarity] = 0;
                            devil.costs[rarity] = 0;
                        }
                    }
                    else{
                        devil.pure_costs[rarity] = 0;
                        devil.costs[rarity] = 0;
                    }
                }
            
                if(!pass)   all_pass = false;
            });
        }

        this.races = races;
        this.race_data = race_data;

        this.devils = devil_array;
        this.devil_data = devil_data;

        this.skillTypes = skillTypes;
        this.skill_data = skill_data;
        this.skills = Object.values(skill_data);
    }
}

export default Resource;