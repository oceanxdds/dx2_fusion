class DevilBom {
    
    constructor(devil, d1, d2, d3, d4){

        let self = this;

        this.devil = devil;
        this.parent = null;
        this.auto = true;

        [d1,d2,d3,d4] = [d1,d2,d3,d4].map(d=>{
            let child = null;
            if(d){
                child = new DevilBom(d);
                child.parent = self;
                if(d.source!='normal_fusion'&&d.source!='multi_fusion'){
                    self.auto = false;
                }
            }
            return child;
        });
        
        this.child1 = d1;
        this.child2 = d2;
        this.child3 = d3;
        this.child4 = d4;
        this.order = 0;
        this.upgrade = false;
        this.downgrade = false;
        this.mag = 0;
        this.mag_pure = 0;
        this.collapse = false;

        this.init();
    }

    set(bom){
        
        bom.child1.parent = this;
        bom.child2.parent = this;
        if(bom.child3)  bom.child3.parent = this;
        if(bom.child4)  bom.child4.parent = this;
        
        this.auto = bom.auto;
        this.child1 = bom.child1;
        this.child2 = bom.child2;
        this.child3 = bom.child3;
        this.child4 = bom.child4;
        this.order = bom.order;
        this.upgrade = bom.upgrade;
        this.downgrade = bom.downgrade;
        this.mag = bom.mag;
        this.mag_pure = bom.mag_pure;
    }

    unset(){

        this.child1 = null;
        this.child2 = null;
        this.child3 = null;
        this.child4 = null;
        this.auto = true;
        this.order = 0;
        this.upgrade = false;
        this.downgrade = false;
        this.mag = 0;
        this.mag_pure = 0;
    }

    init(){

        if(this.devil.source=='multi_fusion' && this.child1){
            
            let devil = this.devil;

            this.order = 0;
            this.upgrade = false;
            this.downgrade = false;
            this.mag = devil.fusionMag;
            this.mag_pure = devil.fusionMag;
        }
        else if(this.child1 && this.child2){

            let devil = this.devil;
            let d1 = this.child1.devil;
            let d2 = this.child2.devil;

            this.order = (d1.rarity>d2.rarity) 
                ? (d1.rarity*10+d2.rarity) 
                : (d2.rarity*10+d1.rarity);
            this.upgrade = (d1.rarity < devil.rarity && d2.rarity < devil.rarity);
            this.downgrade = (d1.rarity > devil.rarity || d2.rarity > devil.rarity);

            let g = (d1.grade + d2.grade)/2;
            let A = 0;
            let B = 0;
            let r = (devil.rarity*2)-d1.rarity-d2.rarity;

            A = [
                //-1 ~ 4
                [5,     5,          5,          5,          5,          5],
                [5,     5,          25,         50,         0,          0],
                [250,   500,        2500,       5000,       5200,       5400],
                [0,     6000,       150000,     300000,     320000,     0],
                [0,     60000,      1500000,    3000000,    4200000,    0]
            ][devil.rarity-1][r+1];

            B = [0,0,0.3,0.45,60,75,1080,1260,14400,16200][Math.floor(devil.grade/10)];

            let mag = A + (devil.grade-g) * B;
            
            this.mag = Math.floor(mag);
        
            if(devil.rarity==5)         this.mag_pure = Math.floor(mag*0.7);
            else if(devil.rarity==4)    this.mag_pure = Math.floor(mag*0.5);
            else                        this.mag_pure = this.mag;

            if( A==0 ){
                this.mag = 0;
                this.mag_pure = 0;
            }
        }
        else{
            this.order = 0;
            this.upgrade = false;
            this.downgrade = false;
            this.mag = 0;
            this.mag_pure = 0;
        }
    }

    showMag(){

        return (this.mag/1).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    showMagPure(){

        return (this.mag_pure/1).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    caculate_mag(layer){

        let mag = this.mag;
        let mag1 = (this.child1?this.child1.caculate_mag(layer+1):0);
        let mag2 = (this.child2?this.child2.caculate_mag(layer+1):0);
        let mag3 = (this.child3?this.child3.caculate_mag(layer+1):0);
        let mag4 = (this.child4?this.child4.caculate_mag(layer+1):0);

        if(this.devil.source=='multi_fusion'){
            mag += (this.child1?this.child1.caculate_mag_pure():0) 
                + (this.child2?this.child2.caculate_mag_pure():0)
                + (this.child3?this.child3.caculate_mag_pure():0)
                + (this.child4?this.child4.caculate_mag_pure():0);
        }
        else if(layer==1){
            if(mag1>mag2){  mag += mag1 + (this.child2?this.child2.caculate_mag_pure():0);   }
            else{           mag += (this.child1?this.child1.caculate_mag_pure():0) + mag2;   }
        }
        else{
            mag += mag1 + mag2 + mag3 + mag4;
        }

        return mag;
    }

    caculate_mag_pure(){

        return this.mag_pure 
            + (this.child1?this.child1.caculate_mag_pure():0)
            + (this.child2?this.child2.caculate_mag_pure():0)
            + (this.child3?this.child3.caculate_mag_pure():0)
            + (this.child4?this.child4.caculate_mag_pure():0);
    }

    showTotalMag(){

        let mag = this.caculate_mag(1);

        return (mag/1).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    showTotalMagPure(){

        let mag_pure = this.caculate_mag_pure();

        return (mag_pure/1).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    getCost(rarity){

        let d1 = this.child1 ? this.child1.devil : null;
        let d2 = this.child2 ? this.child2.devil : null;
        let d3 = this.child3 ? this.child3.devil : null;
        let d4 = this.child4 ? this.child4.devil : null;
        
        let cost1_p = d1 ? d1.pure_costs[rarity] : null;
        let cost1_x = d1 ? d1.costs[rarity] : null;
        let cost2_p = d2 ? d2.pure_costs[rarity] : null;
        let cost2_x = d2 ? d2.costs[rarity] : null;

        let cost3_p = d3 ? d3.pure_costs[rarity] : null;
        let cost4_p = d4 ? d4.pure_costs[rarity] : null;

        if(this.devil.source=='multi_fusion'){

            if(cost1_p==null||cost2_p==null || (d3&&cost3_p==null) || (d4&&cost4_p==null) )
                return null;

            return this.mag
                + (d1 ? cost1_p : 0) 
                + (d2 ? cost2_p : 0)
                + (d3 ? cost3_p : 0)
                + (d4 ? cost4_p : 0);
        }

        if(cost1_p==null||cost1_x==null||cost2_p==null||cost2_x==null)
            return null;

        if(d1.rarity <= rarity){
            cost1_p = 0;
            cost1_x = 0;
        }

        if(d2.rarity <= rarity){
            cost2_p = 0;
            cost2_x = 0;
        }

        let cost1 = cost1_x + cost2_p;
        let cost2 = cost1_p + cost2_x;

        return (cost1 > cost2 ? cost2 : cost1) + this.mag;
    }

    getCostPure(rarity){

        let d1 = this.child1 ? this.child1.devil : null;
        let d2 = this.child2 ? this.child2.devil : null;
        let d3 = this.child3 ? this.child3.devil : null;
        let d4 = this.child4 ? this.child4.devil : null;

        let cost1 = d1 ? d1.pure_costs[rarity] : null;
        let cost2 = d2 ? d2.pure_costs[rarity] : null;
        let cost3 = d3 ? d3.pure_costs[rarity] : null;
        let cost4 = d4 ? d4.pure_costs[rarity] : null;

        if((d1&&cost1==null)||(d2&&cost2==null)||(d3&&cost3==null)||(d4&&cost4==null))
            return null;

        if(this.devil.source=='multi_fusion'){
            
            return this.mag_pure
                + ( d1 ? cost1 : 0 )
                + ( d2 ? cost2 : 0 )
                + ( d3 ? cost3 : 0 )
                + ( d4 ? cost4 : 0 );
        }

        return (d1.rarity > rarity ? cost1 : 0) 
            + (d2.rarity > rarity ? cost2 : 0)
            + this.mag_pure;
    }

    isFirstBom(bom){

        return this.child1==bom;
    }

    isLastBom(bom){

        if(this.child4) return this.child4==bom;
        if(this.child3) return this.child3==bom;
        if(this.child2) return this.child2==bom;
        if(this.child1) return this.child1==bom;
    }

    static bom(devil, d1, d2, d3, d4)
    {
        if(devil.source=='multi_fusion'){
            return new DevilBom(devil, d1, d2, d3, d4);
        }

        let g = (d1.grade + d2.grade)/2;
    
        if( ! (devil.min <= g && g < devil.max ) ){
            return null;
        }
    
        return new DevilBom(devil, d1, d2);
    }
    
}

export default DevilBom;