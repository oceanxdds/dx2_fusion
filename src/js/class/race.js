import i18n from '../utility/i18n'

class Race {
    
    constructor(race){
        
        this.name = race.name;
        this.names = race.names;
        this.highlight = race.highlight;
        this.formulas = race.formulas;
        this.devils = race.devils;
        this.fusion = race.fusion;
    }

    showName(){

        return this.names
            ? (this.names[i18n.locale] || this.names[i18n.defaultLocale])
            : '';
    }
}

export default Race;