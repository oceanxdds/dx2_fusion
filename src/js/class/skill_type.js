import i18n from '../utility/i18n'

class SkillType {
    
    constructor(type){

        this.name = type.name;
        this.names = type.names;
        this.skills = type.skills;
    }

    showName(){

        return this.names
            ? (this.names[i18n.locale] || this.names[i18n.defaultLocale])
            : '';
    }
}

export default SkillType;