class Cookie{

    constructor(){

        this.one_year = 365*24*60*60*1000
    }

    setCookie(name,value){

        let exp  = new Date();
        exp.setTime(exp.getTime() + this.one_year);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    }
    
    getCookie(name){
        
        let arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
         if(arr != null) return unescape(arr[2]); return null;
    }
}

export default new Cookie()