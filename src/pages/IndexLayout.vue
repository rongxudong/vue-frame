<template>
    <div class="article_list">
        <ul>
            <li v-for="i in list" :key="i.id">发表于
                <time v-text="moment(i.create_at).fromNow()"></time>
                <router-link :to="'/content/' + i.id">
                    {{ i.title }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
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
                this.$http.get('topics', null, r => {
                    this.list = r.data
                })
            }
        }
    }
</script>

<style>
</style>