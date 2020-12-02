import i18n from '../../lang';

class Skill{
    
    constructor(skill){

        this.name = skill.name;
        this.names = skill.names;
        this.descs = skill.descs;
        this.mp = skill.mp==null ? '' : skill.mp;
        this.point = skill.point == null ? '' : skill.point;
        this.element = skill.element == null ? '' : skill.element;
        this.type = null;
        this.devils = [];
    }

    showName(){

        return this.names 
            ? (this.names[i18n.locale] || this.names[i18n.defaultLocale])
            : '';
    }

    showDesc(){

        return this.descs
            ? (this.descs[i18n.locale] || this.descs[i18n.defaultLocale])
            : '';
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