import { i18nLocale, i18nDefaultLocale, default as i18n } from '../utility/i18n'

class Skill{
    
    constructor(skill){

        this.id = skill.id;
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
            ? (this.names[i18nLocale()] || this.names[i18nDefaultLocale()])
            : '';
    }

    showDesc(){

        return this.descs
            ? (this.descs[i18nLocale()] || this.descs[i18nDefaultLocale()])
            : '';
    }

    showHint(){
        
        if(!this.names)
            return ''

        const t = i18n.global.t.bind(i18n.global);

        let hint = '['+t('message.element')+']'
        + ' : '
        + (this.type ? this.type.showName():'')
        + (this.mp ? ' [MP] : '+this.mp:'')
        + (this.point ? ' ['+t('message.inherit') + '] : '+this.point : '') 
        + ' ['+t('message.desc')+'] : '
        +this.showDesc();

        return hint;
    }

    addDevil(new_devil){
        
        let devils = this.devils.filter( devil => devil.id == new_devil.id );

        if(devils.length==0)
            this.devils.push(new_devil);
        
        return this;
    }
}

export default Skill;