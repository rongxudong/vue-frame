<template>
    <div class="article_list">
        <ul>
            <li v-for="i in list" :key="i.id">发表于
                <!--<time v-text="moment(i.create_at).fromNow()"></time>-->
                <router-link :to="'/content/' + i.id">
                    {{ i.title }}
                </router-link>
            </li>
        </ul>
        <router-link to="/IndexBanner">Go to IndexBanner</router-link>
        <div id="container">
            <div class="column-1">one</div>
            <div class="column-2">two</div>
            <div class="column-3">three</div>
            <div class="column-4">four</div>
            <div class="column-5">five</div>
        </div>
    </div>
</template>

<script>
    let date = new Date();
    let timer = date.getTime().toString();

    export default {
        data () {
            return {
                list: []
            }
        },
        created () {
            this.getData();
        },
        beforeRouteLeave(to, from, next) {
            // 设置下一个路由的 meta
            to.meta.keepAlive = false; // 让 A 不缓存，即刷新
            next();
        },
        methods: {
            getData () {
                this.$ajax.get('topics?timer=' + timer, null, r => {
//                    console.log(r);
                    this.list = r;
                })
            }
        }
    }
</script>

<style>
    #container {
        height: 200px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-auto-rows: 1fr 1fr 1fr;
        grid-template-areas:"one one two three"
        "four four two three"
        "five five five three";
    }
    .column-1{
        grid-area:one;
        background-color: #F8594C;
    }
    .column-2{
        grid-area:two;
        background-color: #FFA29B;
    }
    .column-3{
        grid-area:three;
        background-color: #318B98;
    }
    .column-4{
        grid-area:four;
        background-color: #E73123;
    }
    .column-5{
        grid-area:five;
        background-color: #ABE646;
    }
</style>