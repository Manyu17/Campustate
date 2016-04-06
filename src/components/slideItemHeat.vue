<template>
    <div id="heat-list-box" class="content-base">
        <div class="banner" id="hot-ad"><a href="{{ ad.link }}"><img v-bind:src="ad.image" alt="" id="{{ ad.id }}"></a></div>
        <list :xuanxuanitems="xuanxuanitems" :activityitems="activityitems" :showxuanxuan="showxuanxuan"></list>
    </div>   
</template>
<script>
    export default {
        props: ['xuanxuanitems','activityitems','ad','showxuanxuan'],
        data (){
            return {
            }
        },
        route:{
              
        },
        methods:{
            
        },
        components:{
            "list":require('./list.vue')
        }
    }
</script>

<style lang="less">
@import '../assets/less/common/func.less';
.banner{
    width: 100%;
    height: 276px;
    text-align: center;
    overflow: hidden;
    img{
        width: 37.5*16px;
        height: 276px;
        border-radius: 12px;
    }
}
</style>