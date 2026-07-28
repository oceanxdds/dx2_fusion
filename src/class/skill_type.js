import { i18nLocale, i18nDefaultLocale } from '../utility/i18n'

class SkillType {
    
    constructor(type){

        this.id = type.id;
        this.names = type.names;
        this.skills = [];
    }

    showName(){

        return this.names
            ? (this.names[i18nLocale()] || this.names[i18nDefaultLocale()])
            : '';
    }
}

export default SkillType;