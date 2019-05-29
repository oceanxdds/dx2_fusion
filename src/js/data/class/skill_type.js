import i18n from '../../lang';

class SkillType {
    
    constructor(type){

        this.name = type.name;
        this.name_tw = type.name_tw == null ? '' : type.name_tw;
        this.name_en = type.name_en == null ? '' : type.name_en;
        this.skills = type.skills;
    }

    showName(){
        
        switch(i18n.locale){
            case 'ja': name = this.name; break;
            case 'tw': name = this.name_tw; break;
            case 'en': name = this.name_en; break;
            default: name = this.name;
        }
        if(!name)
            name = this.name;
        if(!name)
            name = '';
        return name;
    }
}

export default SkillType;