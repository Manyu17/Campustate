<template>
<div class="search-input-box">
    <span class="icon iconfont icon-zoom"></span>
    <input type="text" v-model="text" @keyup="searching" placeholder="{{placeHolder}}">
</div>
    
</template>
<script>
    require('../assets/less/iconfont/iconfont.css')
    export default {
        props:['placeHolder','text'],
        data (){
            return {
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
                       __self.$dispatch('getSearchAjax',__self.text)
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