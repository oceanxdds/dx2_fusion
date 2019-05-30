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
        
        let d0 = this;

        if(!d0.race.fusion||!d0.fusion)
            return [];

        let formulas = d0.race.formulas.map( f => {

            let [r1,r2] = [f[0],f[1]];

            if(!r1.fusion || !r2.fusion)
                return null; 

            let boms = r1.devils.flatMap( d1 => 
                d1.fusion ? r2.devils.map( d2 => d2.fusion ? DevilBom.bom(d0,d1,d2) : null ) : null
            ).filter(x=>x);

            return boms.length > 0 
                ? { 'name': r1.showName() + ' x ' + r2.showName(),
                    'boms':boms.sort( (bom1,bom2) => bom1.order - bom2.order ) }
                : null ;
  
        }).filter(x=>x);

        return formulas;
    }

    fusion_formulas(){

        let d1 = this;
        let multi_formulas = [];

        if(!d1.race.fusion||!d1.fusion)
            return multi_formulas;

        // Target Race Loop
        d1.race.usage.forEach( usage => {

            if(!usage.r0.fusion)
                return;

            usage.r0.devils.forEach( d0 => {

                if(!d0.fusion)
                    return;

                let formulas = usage.r2s.map( r2 => {
                    
                    if(!r2.fusion)
                        return null;

                    let boms = r2.devils.map( d2 => d2.fusion ? DevilBom.bom(d0, d1, d2) : null ).filter(x=>x);

                    return boms.length > 0 
                        ? { 'name': d1.race.showName() + ' x ' + r2.showName(),
                            'boms': boms.sort( (bom1,bom2) => (bom1.order - bom2.order) ) }
                        : null ;
                        
                }).filter(x=>x) ;

                if(formulas.length>0){
                    multi_formulas.push({devil:d0,formulas:formulas});
                }
            });

        });

        return multi_formulas;
    }
}

export default Devil;