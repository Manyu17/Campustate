<template>
    <div id="follow-list-box" class="content-base">
        <list :xuanxuanitems="xuanxuanitems" :activityitems="activityitems" :showxuanxuan="showxuanxuan"></list>
    </div>
    
</template>
<script>
    export default {
        props: ['xuanxuanitems','activityitems','showxuanxuan'],
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
</style>