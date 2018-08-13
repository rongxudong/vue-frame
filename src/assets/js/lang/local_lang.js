import moment from 'moment';

export default {
    browserLanguage(element) {
        switch(true){
            case element.indexOf('zh') > -1 :
                moment.locale('zh-cn');
                return 'zh_cn';
                break;
            case element.indexOf('en') > -1 :
                moment.locale('en-gb');
                return 'en';
                break;
            default:
                moment.locale('zh-cn');
                return 'zh_cn';
        }
    },
    setLang(lang) {
        window.localStorage.setItem('user_lang', lang);
    },
    getLang() {
        let localLang = window.localStorage.getItem('user_lang');
        let language = (navigator.language || navigator.browserLanguage).toLowerCase();
        if (localLang == null || localLang == 'undefined') {
            return this.browserLanguage(language);
        } else {
            return this.browserLanguage(localLang.toLowerCase());
        }
    }
}