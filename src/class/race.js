import { i18nLocale, i18nDefaultLocale } from '../utility/i18n'

class Race {
    
    constructor(race){

        this.id = race.id;
        this.names = race.names;
        this.formulas = race.formulas;
        this.devils = [];
        this.fusion = race.fusion;
    }

    showName(){

        return this.names
            ? (this.names[i18nLocale()] || this.names[i18nDefaultLocale()])
            : '';
    }
}

export default Race;