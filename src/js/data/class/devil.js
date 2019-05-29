import DevilBom from './devil_bom';
import i18n from '../../lang';

class Devil {
    
    constructor(devil){
    
        this.name = devil.name;
        this.name_tw = devil.name_tw;
        this.name_en = devil.name_en;
        this.rarity = devil.rarity;
        this.grade = devil.grade;
        this.icon = devil.icon;
        this.elements = devil.elements;
        this.skills = devil.skills;
        this.skill4 = devil.skill4;
        this.skill5 = devil.skill5;
        this.type = devil.type;
        this.max = null;
        this.min = null;
        this.race = null;
        this.cost = null;
        this.cost_pure = null;
        this.costs = [null,null,null,null,null,null];
        this.pure_costs = [null,null,null,null,null,null];
        this.fusion = devil.fusion;
    }

     showName(){
    
        let name;
 
        switch(i18n.locale){
            case 'ja': name = this.name; break;
            case 'tw': name = this.name_tw; break;
            case 'en': name = this.name_en; break;
            default: name = this.name;
        }
        if(!name)
            name = this.name;

        return name;
    }

    showGrade(){
    
        return 'G.'+this.grade;
    }

    showRarity(){

        let rarity = '';
        for(let i=0; i<this.rarity;i++)
            rarity += '★';
        return rarity;
    }

    showCost(rarity){

        //let cost = this.costs[rarity];

        return (this.cost/1).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    showCostPure(rarity){

        //let cost = this.pure_costs[rarity];
        
        return (this.cost_pure/1).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    bom(){
        return new DevilBom(this);
    }

    fission_formulas(){
        
        let devil = this;
        
        let formulas = [];
    
        if(!devil.race.fusion||!devil.fusion)
            return formulas;

        this.race.formulas.forEach(function(f){

            let r1 = f[0];
            let r2 = f[1];

            let boms = [];

            r1.devils.forEach(function(d1){
                
                if(!d1.race.fusion||!d1.fusion)
                    return;

                r2.devils.forEach(function(d2){

                    if(!d2.race.fusion||!d2.fusion)
                        return;

                    let bom = DevilBom.bom(devil,d1,d2);

                    if(bom)
                        boms.push(bom);
                });
            });

            boms.sort(function(bom1,bom2){
                return bom1.order - bom2.order;
            });

            if(boms.length>0){
                formulas.push({
                    'name': r1.showName() + ' x ' + r2.showName(),
                    'boms':boms
                });
            }

        });

        return formulas;
    }

    fusion_formulas(){

        let d1 = this;
        let multi_formulas = [];

        if(!d1.race.fusion||!d1.fusion)
            return multi_formulas;

        // Target Race Loop
        this.race.usage.forEach(function(u){

            // Target Devil Loop
            u.target.devils.forEach(function(target){

                if(!target.race.fusion||!target.fusion)
                    return;

                let formulas = [];
            
                u.r2s.forEach(function(r2){

                    let boms = [];

                    // Pair Devil Loop
                    r2.devils.forEach(function(d2){

                        if(!d2.race.fusion||!d2.fusion)
                            return;

                        let bom = DevilBom.bom(target, d1, d2);

                        if(bom)
                            boms.push(bom)
                    });

                    boms.sort(function(c1,c2){
                        return c1.order - c2.order;
                    });

                    if(boms.length>0){

                        formulas.push({
                            'name': d1.race.showName() + ' x ' + r2.showName(),
                            'boms': boms
                        });
                    }
                });
                
                if(formulas.length>0){
                    multi_formulas.push({
                        devil:target,
                        formulas:formulas
                    });
                }
            });

        });

        return multi_formulas;
    }
}

export default Devil;