<template>
    <el-row>
        <el-col :span="22">
            <div class="head-wrap">{{ $t('header.name')}}</div>
        </el-col>
        <el-col :span="2">
            <el-select v-model="value" placeholder="请选择" value="切换语言">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-col>
    </el-row>
</template>

<script>
    import LangStorage from '../assets/js/lang/local_lang';

    export default {
        data() {
            return {
                activeIndex: '1',
                options: [{
                    value: 'CN',
                    label: '中文'
                }, {
                    value: 'EN',
                    label: 'English'
                }],
                value: this.$i18n.locale
            };
        },
        watch: {
            value (val) {
                this.$i18n.locale = val;
                switch (val) {
                    case 'CN':
                        this.moment.locale('zh-cn');
                        break;
                    case 'EN':
                        this.moment.locale('en-gb');
                        break;
                    default:
                        this.moment.locale('zh-cn');
                }
                console.log(`${this.moment.locale()}`)
                LangStorage.setLang(val);
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
<style scoped>
    .head-wrap{

    }
</style>