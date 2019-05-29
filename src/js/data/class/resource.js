import Race from './race';
import Devil from './devil';
import Skill from './skill';
import SkillType from './skill_type';

/////////////////////////////
// Digital Devil Data Class
/////////////////////////////

class Resource{
    
    constructor(ddd, sss){
        
        this.races = [];
        this.devils = [];
        this.skillTypes = [];
        this.skills = [];
        let race_data = {};
        let devil_data = {};
        let devil_array = [];
        let type_data = {};
        let skill_data = {};
        let skill_array = [];

        sss = sss.map(function(type){

            type = new SkillType(type);
            type_data[type.name] = type;

            type.skills = type.skills.map(function(skill){
                skill = new Skill(skill);
                skill.type = type;
                skill_data[skill.name] = skill;
                skill_array.push(skill);
                return skill;
            });
            return type;
        });

        //create race_data
        //convert race to Race Class
        //convert devil to Devil Class
        ddd = ddd.map(function(race){
            
            race.devils = race.devils.map(function(devil){
                return new Devil(devil);
            });
            let race_obj = new Race(race);
            race_data[race.name] = race_obj;
            return race_obj;
        });

        //replace formula's race from text to object
        ddd.forEach(function(race){

            race.formulas.forEach(function(formula){
                formula[0] = race_data[formula[0]];
                formula[1] = race_data[formula[1]];
            });
        });

        //create devil_data
        //convert devil's skill from text to object
        ddd.forEach(function(r1){

            r1.devils.forEach(function(devil, index){

                devil.race = r1;
                devil.max = devil.grade;
                devil.min = (index==r1.devils.length-1 ? 0 : r1.devils[index+1].grade);

                if(devil.skills){
                    devil.skills = devil.skills.map(function(name){
                        let skill = skill_data[name];
                        if(skill){
                            skill.addDevil(devil);
                        }
                        return skill ? skill : new Skill({name:name});
                    });
                }
                if(devil.skill4){
                    devil.skill4 = devil.skill4.map(function(name){
                        let skill = skill_data[name];
                        if(skill){
                            skill.addDevil(devil);
                        }
                        return skill ? skill : new Skill({name:name});
                    });
                }
                if(devil.skill5){
                    devil.skill5 = devil.skill5.map(function(name){
                        let skill = skill_data[name];
                        if(skill){
                            skill.addDevil(devil);
                        }
                        return skill ? skill : new Skill({name:name});
                    });
                }

                devil_array.push(devil);
                devil_data[devil.name] = devil;
            });

            let usage_temp = {};

            ddd.forEach(function(target){

                target.formulas.forEach(function(f){
                    
                    let r2 = null;

                    if(f[0].name==r1.name){
                        r2 = f[1];
                    }
                    if(f[1].name==r1.name){
                        r2 = f[0];
                    }
                    if(r2){

                        if(! (target.name in usage_temp)){
                            usage_temp[target.name] = [];
                        }

                        usage_temp[target.name].push(r2);
                    }
                });
            });

            r1.usage = [];

            for(name in usage_temp){
                r1.usage.push({
                    target:race_data[name],
                    r2s:usage_temp[name]
                })
            }
        });

        devil_array.sort(function(d1,d2){
            if(d1.grade==d2.grad2)  return 0;
            return d1.grade > d2.grade ? 1 : -1;
        });

        //create fission and fusion options

        devil_array.forEach(function(devil){
            devil.fission_boms = [];
            devil.fission_options = devil.fission_formulas();
            devil.fission_options.forEach(function(option){
                devil.fission_boms = devil.fission_boms.concat(option.boms);
            });
        });

        let break_limit=10;
        let all_pass = false;

        while( break_limit-- > 0 && !all_pass){

            all_pass = true;
            
            devil_array.forEach(function(devil){

                let pass = true;

                for(let rarity=1; rarity<=5; rarity++){

                    let cost = null;
                    let pure_cost = null;

                    if(devil.fission_boms.length){
                        
                        devil.fission_boms.forEach(function(bom){

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

        this.races = ddd;
        this.race_data = race_data;
        this.devils = devil_array;
        this.devil_data = devil_data;
        this.skillTypes = sss;
        this.skills = skill_array;
        this.skill_data = skill_data;
        this.builder_options = [];
        this.fusion_options = [];
    }
}

export default Resource;