import i18n from '../../lang';

class Skill{
    
    constructor(skill){

        this.name = skill.name;
        this.name_tw = skill.name_tw==null ? '' : skill.name_tw;
        this.name_en = skill.name_en==null ? '' : skill.name_en;
        this.desc = skill.desc==null ? '' : skill.desc;
        this.desc_tw = skill.desc_tw==null ? '' : skill.desc_tw;
        this.desc_en = skill.desc_en==null ? '' : skill.desc_en;
        this.mp = skill.mp==null ? '' : skill.mp;
        this.point = skill.point == null ? '' : skill.point;
        this.element = skill.element == null ? '' : skill.element;
        this.type = null;
        this.devils = [];
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
            name = '--------------------';
        return name;
    }

    showDesc(){
    
        let desc = '';

        switch(i18n.locale){
            case 'ja': desc = this.desc; break;
            case 'tw': desc = this.desc_tw; break;
            case 'en': desc = this.desc_en; break;
            default: desc = this.desc;
        }
        if(!desc)
            desc = this.desc;
        if(!desc)
            desc = '';
    
        return desc;
    }

    showHint(){
        
        if(!this.name)
            return ''

        let hint = '['+i18n.t('message.element')+']'
        + ' : '
        + (this.type ? this.type.showName():'')
        + (this.mp ? ' [MP] : '+this.mp:'')
        + (this.point ? ' ['+i18n.t('message.inherit') + '] : '+this.point : '') 
        + ' ['+i18n.t('message.desc')+'] : '
        +this.showDesc();

        return hint;
    }

    addDevil(new_devil){
        
        let devils = this.devils.filter( devil => devil.name == new_devil.name );

        if(devils.length==0)
            this.devils.push(new_devil);
        
        return this;
    }
}

export default Skill;