<template>
<div class="rest-banner">
    <p class="t-rest-fee">当前余额</p>
    <p class="c-rest-fee">{{restValue}}</p>
    <p class="rest-degree">剩余度数<span class="c-rest-degree"></span></p>
</div>
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    export default {
        props:['restValue'],
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
.rest-banner{
    width: 100%;
    height: 270px;
    border-radius: 8px;
    margin: 32px 0;
    background-image: linear-gradient(60deg, @gradient1 0%, @gradient2 2%,@gradient3 100%);
    box-shadow: 1.5px 2.598px 8px 0px rgba(121, 121, 121, 0.094);/*no*/
    padding-top: 42px;
    p{
        text-align: center;
        color: @card-white5;
    }
    .t-rest-fee{
        font-size: 24px;/*px*/
        line-height: 60px;
    }
    .c-rest-fee{
        font-size: 72px;/*px*/
        line-height: 100px;
        &:before{
            content: '￥';
            font-size: 36px;
        }
    }
    .rest-degree{
        font-size: 22px;/*px*/
        line-height: 60px;
    }
}
</style>

