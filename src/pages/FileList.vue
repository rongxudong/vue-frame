<template>
    <div class="Home-main">
        <div class="right bg-style">
            <div class="title" style="margin: .18rem 0;">
                <span>公告栏</span>
                <!--<a href="#">MORE &gt;&gt;</a>-->
            </div>
            <div class="right-list">
                <div class="item" v-for="(item, index) in DataResList" :key="item.index">
                    <div class="file-name text_overflow">
                        <i :class="[
                                { 'icon-word':item.type == 1 },
                                { 'icon-JPGs':item.type == 2 },
                                { 'icon-pdf':item.type == 3 },
                                { 'icon-wenjian':item.type == 4 }
                                ]">
                        </i>
                        {{item.fileName}}
                    </div>
                    <div class="file-operate align_items flex_end">
                        <span class="operate look" @click="onLook()">查看</span>
                        <span class="operate upLoad" @click="onDownload()">下载</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .right {
        width: 100%;
    }
</style>