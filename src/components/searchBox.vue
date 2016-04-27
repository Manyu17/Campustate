<template>
<div class="search-input-box">
    <span></span>
    <input type="text" v-model="searchKey" @keyup="searching" placeholder="{{placeHolder}}">
</div>
    
</template>
<script>
    require('../assets/less/iconfont/iconfont.css')
    export default {
        props:['placeHolder'],
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
                       __self.$dispatch('getSearchAjax',__self.searchKey)
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

</style>