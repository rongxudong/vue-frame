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
        methods: {
            getData () {
                this.$http.get('topics?timer=' + timer, null, r => {
                    console.log(r);
                    this.list = r;
                })
            }
        }
    }
</script>

<style>
</style>