<template>
<li class="use-record">
    <p class="time">{{recordData.time}}</p>
    <p class="money">{{recordData.usemoney}}</p>
</li>
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    export default {
        props:['recordData'],
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
<style lang="less" scope>
@import '../assets/less/common/func.less';

.use-record{
    .flexbox();
    height: 82px;
    padding: 14px 30px;
    p{
        text-align: left;
    }
    .time{
        font-size: 20px;/*px*/
        color: @font-gray3;
        line-height: 82px;
        margin-left: 10px;
        flex:1;
    }
    .money{
        &:before{
            content: '￥ ';
        }
        margin: 0 10px;
        font-size: 26px;/*px*/
        color: @font-gray2;
        line-height: 82px;
    }
}

</style>

