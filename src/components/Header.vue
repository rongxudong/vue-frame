<template>
    <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6">
            <div class="grid-content bg-purple head-wrap">{{ $t('header.name') }}</div>
        </el-col>
        <!--<el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>-->
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <el-row type="flex" class="row-bg" justify="space-between" align="middle">
                    <el-col :span="3">
                        <el-badge is-dot class="item">
                            <i class="iconfont icon-xiaoxi"></i>
                        </el-badge>
                    </el-col>
                    <el-col :span="3">
                        <i class="iconfont icon-yonghu"></i>
                    </el-col>
                    <el-col :span="12">
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
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import LangStorage from '../assets/js/lang/local_lang';

    export default {
        data() {
            return {
                activeIndex: '1',
                options: [
                    {
                        value: 'zh_CN',
                        label: '中文'
                    }, {
                        value: 'en',
                        label: 'English'
                    }
                ],
                value: this.$i18n.locale
            };
        },
        watch: {
            value (val) {
                this.$i18n.locale = val;
                switch (val) {
                    case 'zh_CN':
                        this.moment.locale('zh-cn');
                        break;
                    case 'en':
                        this.moment.locale('en-gb');
                        break;
                    default:
                        this.moment.locale('zh-cn');
                }
//                console.log(`${this.moment.locale()}`);
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
<style scoped lang="less" rel="stylesheet/less">
    @import "../assets/css/_variable";

    .head-wrap {
        font-size: 20px;
        color: @base;
        font-weight: bold;
    }
    .el-badge {
        line-height: 20px;
    }
    .icon-xiaoxi:before ,
    .icon-yonghu:before {
        font-size: 20px;
        color: @minor-col;
        cursor: pointer;
    }
</style>