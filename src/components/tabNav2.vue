<template>
<ul class="tool-tab-nav2">
    <li v-for="item in tabList" :class="{'current':item.current}" @click="changePage($index)"><span>{{item.text}}</span></li>
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
            changePage:function(index) {
                this.$dispatch('changeRoute',index)
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
.tool-tab-nav2{
    .flexbox();
    height: 88px;
    li{
        display: block;
        flex:1;
        color: @font-gray3;
        font-size: 22px;/*px*/
    }
    span{
        height: 72px;
        line-height: 88px;
    }
    .current{
       color: @blue1; 
       border-bottom: none;
       font-size: 26px;/*px*/
       span{
           display: inline-block;
           border-bottom: 6px solid @blue1;
           border-radius: 3px;
       }
    }
}
</style>