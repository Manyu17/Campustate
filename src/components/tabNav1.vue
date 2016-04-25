<template>
<ul class="tool-tab-nav">
    <li v-for="item in tabList" :class="{'current':item.current}"><span class="icon iconfont {{item.icon}}"></span>{{item.text}}</li>
</ul>
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    export default {
        props:['tabList'],
        data (){
            return {
            }
        },
        ready(){
        },
        attached(){
        },
        route:{
            data (transition){

            },
            deactivate (transition){
                transition.next();
            }  
        },
        methods:{
        },
        events:{
            
        },
        components:{
            
            
        }
    }
</script>
<style lang="less">
@import '../assets/less/common/func.less';
.tool-tab-nav{
    .flexbox();
    height: 110px;
    border-radius: 6px 6px 0 0;
    background-color: #ebeaea;
    li{
        display: block;
        flex:1;
        color: @font-gray3;
        font-size: 18px;/*px*/
        line-height: 2;
    }
    span{
        &:before{
            color: @font-gray3;
            font-size: 48px; 
            display: block;
            line-height: 2.75*16px;
            margin: 0.625*16px 0;
            background-color: transparent;
        }
    }
    .current{
       color: @blue1; 
       background-color: @card-white5;
       border:2px solid rgb(226, 226, 226);/*no*/
       box-shadow: 1.5px 0 8px 0px rgba(121, 121, 121, 0.122);/*no*/
       border-radius: 6px 6px 0 0;
       border-bottom: none;
       span{
           &:before{
               color: @blue1;
           }
       }
    }
}
</style>

