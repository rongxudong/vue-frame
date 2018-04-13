import Moment from 'moment';

export default {
    browserLanguage(element) {
        switch(true){
            case element.indexOf('zh') > -1 :
                Moment.locale('zh-cn');
                return 'CN';
                break;
            case element.indexOf('en') > -1 :
                Moment.locale('en-gb');
                return 'EN';
                break;
            default:
                Moment.locale('zh-cn');
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