<template>
    <div>
        <div v-for='item in progressList'>
            <progress-item :number="item.progress"></progress-item>
        </div>
    </div>
</template>
<script>
    import progressItem from './progress';
    export default {
        props: ['list'],
        data() {
            return {
                progressList: this.list
            }
        },
        components: {
            'progress-item': progressItem
        }
    }
</script>

<style>
</style>