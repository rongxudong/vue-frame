import moment from 'moment';

export default {
    browserLanguage(element) {
        switch(true){
            case element.indexOf('zh') > -1 :
                moment.locale('zh-cn');
                return 'CN';
                break;
            case element.indexOf('en') > -1 :
                moment.locale('en-gb');
                return 'EN';
                break;
            default:
                moment.locale('zh-cn');
                return 'CN';
        }
    },
    setLang(lang) {
        window.localStorage.setItem('user_lang', lang);
    },
    getLang() {
        let localLang = window.localStorage.getItem('user_lang');
        let language = (navigator.language || navigator.browserLanguage).toLowerCase();
        if (localLang === null) {
            return this.browserLanguage(language);
        } else {
            return this.browserLanguage(localLang.toLowerCase());
        }
    }
}