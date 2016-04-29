<template>
<li class="pay-record">
    <div class="record">
        <p class="card-num">帐号：<span>{{recordData.account}}</span></p>
        <p class="time">{{recordData.time}}</p>
    </div>
    <p class="money">{{recordData.pay}}</p>
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

.pay-record{
    .flexbox();
    height: 82px;
    padding: 14px 30px;
    .record{
        margin-left: 10px;
        flex:1;
    }
    p{
        text-align: left;
    }
    .card-num{
        font-size: 24px;/*px*/
        color: @font-gray2;
        line-height: 46px;
        height: 46px;
    }
    .time{
        font-size: 20px;/*px*/
        color: @font-gray3;
        line-height: 36px;
        height: 36px;
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

