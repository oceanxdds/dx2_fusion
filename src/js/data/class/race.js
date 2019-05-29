import i18n from '../../lang';

class Race {
    
    constructor(race){
        
        this.name = race.name;
        this.name_tw = race.name_tw;
        this.name_en = race.name_en;
        this.highlight = race.highlight;
        this.formulas = race.formulas;
        this.devils = race.devils;
        this.fusion = race.fusion;
    }

    showName(){

        let name;

        switch(i18n.locale){
            case 'ja': name = this.name; break;
            case 'tw': name = this.name_tw; break;
            case 'en': name = this.name_en; break;
            default: name = this.name;
        }
    
        return name ? name : this.name;
    }
}

export default Race;