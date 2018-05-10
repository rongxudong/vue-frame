<template>
    <div class="hello">
        <c-title :text="title"></c-title>
        <p class="welcome">欢迎使用 vue</p>
        <div v-html="content"></div>
    </div>
</template>

<script>

    import {mapState} from 'vuex';
    import cTitle from '@/components/Title';

    export default {
        data () {
            return {
                title: 'Hello Vue!',
                content: ''
            }
        },
        methods: {
            async getContent () {
                this.$http.get('hello?ID=12345', null, r => {
                    this.content = r.data.content;
                })
            }
        },
        mounted () {
            this.$store.commit('message', '欢迎使用 vue！');
            this.getContent();
        },
        components: {
            cTitle
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet" scoped>
    h1 {
        color: #42b983;
    }

    .logo {
        width: 100px;
        height: 100px;
        a {
            color: #42b983;
            text-decoration: none;
        }
    }
</style>