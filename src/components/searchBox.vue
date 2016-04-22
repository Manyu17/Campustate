<template>
<div class="search-input-box">
    <span></span>
    <input type="text" v-model="searchKey" @keyup="searching">
</div>
    
</template>
<script>
    require('../assets/less/iconfont/iconfont.css')
    export default {
        data (){
            return {
                searchKey:'',
                lastTime:''
            }
        },
        ready(){
        },
        attached(){
        },
        methods:{
           searching:function(event) {
               var __self = this
               __self.lastTime = event.timeStamp
               setTimeout(function(){
                   if(__self.lastTime - event.timeStamp == 0){
                       __self.$dispatch('getSearchUser',__self.searchKey)
                   }
               },500)//延迟500ms执行ajax请求
           }
        },
        events:{
            
        },
        components:{
            
        }
    }
</script>

<style lang="less">
@import '../assets/less/common/func.less';

.search-input-box{
    width: 100%;
    height: 82px;
    line-height: 82px;
    margin-bottom: 26px;
    .flexbox();
    background-color: @card-white5;
    span{
        display: block;
        width: 82px;
        height: 82px;
        line-height: 82px;
        margin-left: 20px;
        color: @font-gray2;
        vertical-align: middle;
    }
    input{
        flex:1;
        line-height: 82px;
        background-color: @card-white5;
        border: none;
        vertical-align: middle;
        color: @font-gray2;
        font-size: 26px; /*px*/
    }
}

</style>