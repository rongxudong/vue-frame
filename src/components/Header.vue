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
                <el-dropdown placement="bottom" class="code-img-box">
                    <li class="header-code align_items">
                        <i class="iconfont icon-erweima"></i>
                    </li>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item class="align_items">
                            <img class="codeImg" :src="codeImg"/>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <!--<li class="header-message align_items">-->
                    <!--<i class="iconfont icon-xiaoxi1"></i>-->
                    <!--<em class="small-icon"></em>-->
                <!--</li>-->
                <el-dropdown placement="bottom">
                    <li class="header-logo align_items">
                        <img :src="defaultAvatarImg" />
                    </li>
                    <el-dropdown-menu slot="dropdown" class="ps-information">
                        <!--<el-dropdown-item>-->
                            <!--<a class="header-dropdown-style" href="javascript:void(0);">真实姓名</a>-->
                        <!--</el-dropdown-item>-->
                        <el-dropdown-item>
                            <a class="header-dropdown-style" @click="toClient()">官网首页</a>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <a class="header-dropdown-style" @click="toView('/Personal')">个人资料</a>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <a class="header-dropdown-style" @click="toView('/RealName')">实名认证</a>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <a class="header-dropdown-style" href="javascript:void(0);" @click="logout">退出登录</a>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
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
//    import {mapState,mapMutations,mapGetters} from 'vuex';

    export default {
        data () {
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
                codeImg: require('../assets/img/Home/app-code.png'),
                defaultAvatarImg: require('../assets/img/Home/default-avatar-img.png')
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            selectLanguage (key) {
                this.value = key;
            },
            toClient () {
                document.location.replace(this.$store.state.baseUrl.replace('account.', ''));
            },
            toView (path) {
                this.$router.push({path: path});
            },
            getAvatarImg () {
                this.defaultAvatarImg = this.$store.state.resUrl + this.$store.state.avatarImg;
            },
            logout () {
                this.$alert('确认退出吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$ajax.post('/api/bussiness/account/user/logout', null, res => {
                        if (res.code == 0) {
                            document.location.replace(this.$store.state.baseUrl.replace('account.', ''));
                            localStorage.clear();
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.message
                            })
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出登录'
                    });
                })
            }
        },
        computed: {
            avatarImg () {
                return this.$store.state.avatarImg;
            }
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
            },
            avatarImg: function(a, b) {
//                console.log("修改后为：" + a);
//                console.log("修改前为：" + b);
                this.defaultAvatarImg = this.$store.state.resUrl + a;
            }
        },
        mounted () {
            setTimeout(()=>{
                this.getAvatarImg();
            },1000)
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
            height: 60px;
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
