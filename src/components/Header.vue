<template>
    <el-row type="flex" class="row-bg header" justify="space-between">
        <el-col :span="6">
            <div class="grid-content bg-purple head-wrap">
                {{ $t('header.name') }}
                <span class="sys-versions">{{ $t('header.versions') }}</span>
            </div>
        </el-col>
        <el-col :span="4">
            <ul class="grid-content bg-purple flex_end">
                <el-dropdown placement="bottom">
                    <li class="header-code align_items">
                        <i class="iconfont icon-erweima"></i>
                    </li>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <img class="codeImg" :src="codeImg"/>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <li class="header-message align_items">
                    <i class="iconfont icon-xiaoxi1"></i>
                    <em class="small-icon"></em>
                </li>
                <li class="header-logo align_items">
                    <img src="../assets/img/banner_2.png"/>
                    <i class="iconfont icon-yonghu"></i>
                </li>
                <li class="head-language align_items">
                    <div class="select">
                        <span :class="{'isActive': value === item.value}" v-for="item in options"
                              @click="selectLanguage(item.value)">{{item.label}}</span>
                    </div>
                </li>
            </ul>
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
                        label: 'CN'
                    }, {
                        value: 'en',
                        label: 'EN'
                    }
                ],
                value: this.$i18n.locale,
                codeImg: require('../assets/img/RealName/real-fail.png')
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
            },
            selectLanguage (key) {
                this.value = key;
            }
        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../assets/css/_variable";
    @import "../assets/css/_mixin";

    .header {
        height: 60px;
        line-height: 60px;
        ul li {
            cursor: pointer;
        }
        li:not(.head-language) {
            &:hover {
                background-color: #f2f2f2;
            }
        }
        i {
            font-size: 18px;
            color: #7c818d;
        }
    }
    .head-wrap {
        font-size: 20px;
        color: @base;
        font-weight: bold;
        .sys-versions {
            font-size: 13px;
        }
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
    .header-code {
        position: relative;
        padding: 0 18px;
        font-size: 18px;
        &:after {
            content: '';
            position: absolute;
            top: 22px;
            right: 0;
            z-index: 1;
            width: 1px;
            height: 16px;
            background-color: @less-col;
        }
    }
    .codeImg {
        width: 1.5rem;
        min-width: 100px;
        height: 1.5rem;
        min-height: 100px;
    }
    .header-message {
        position: relative;
        padding: 0 20px;
        i　{
            font-size: 20px;
        }
        em.small-icon {
            position: absolute;
            top: 32px;
            left: 33px;
            z-index: 1;
            display: block;
            width: 7px;
            height: 7px;
            background-color: @Danger;
            .common_radius(50%);
        }
    }
    .header-logo {
        padding: 0 10px;
        line-height: 60px;
        img {
            overflow: hidden;
            width: 38px;
            height: 38px;
            -o-object-fit: cover;
            object-fit: cover;
            .common_radius(100%);
        }
    }
    .head-language {
        padding-left: 20px;
        .select {
            width: 86px;
            height: 26px;
            span {
                float: left;
                width: 50%;
                height: 26px;
                line-height: 26px;
                text-align: center;
                font-size: 14px;
                color: #C4A6A6;
                background-color: #fff;
                border: 1px solid #D4D4D4;
            }
            span:nth-of-type(1) {
                border-right: none;
                .border-left-radius(13px);
            }
            span:nth-of-type(2) {
                border-left: none;
                .border-right-radius(13px);
            }
            .isActive {
                color: #fff;
                background-color: #5494F8;
                border: 1px solid #5494F8;
            }
        }
    }
</style>