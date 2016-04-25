<template>
<div class="record-list-box first">
    <ul class="record-list-nav">
        <li v-for="item in recordNavList" class="current">{{item}}</li>
    </ul>
    <ul class="record-list">
        <li >
            <div class="record">
                <p class="card-num">卡号：<span>208113</span></p>
                <p class="time">2016-4-13 08:35</p>
            </div>
            <p class="money">50.00</p>
        </li>
    </ul>
</div>
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    export default {
        props:['recordNavList','dataList'],
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
.record-list-box{
    position: absolute;
    right: 20px;
    left: 20px;
    top:484px;
    bottom: 20px;
    background-color: @card-white5;
    border:2px solid rgb(226, 226, 226);/*no*/
    border-top: none;
    box-shadow: 1.5px 0 8px 0px rgba(121, 121, 121, 0.122);/*no*/
    
}
.record-list-box.first{
    border-radius:0 8px 8px 8px;
}
.record-list-box.second{
    border-radius:8px 8px 8px 8px;
}
.record-list-box.third{
    border-radius:8px 0 8px 8px;
}
.record-list-nav{
    width: 345px;
    height: 44px;
    .flexbox();
    border: 1px solid @blue1;/*no*/
    border-radius: 5px;
    margin: 56px auto 24px;
    li{
        flex:1;
        font-size: 20px;
        color: @blue1;
        line-height: 44px;
    }
    li:first-child{
        border-right: 1px solid @blue1;/*no*/
    }
    li:last-child{
        border-left: 1px solid @blue1;/*no*/
    }
    .current{
        color: @card-white5;
        background-color: @blue1;
    }
}
.record-list{
    li{
        .flexbox();
        height: 82px;
        padding: 14px 30px;
    }
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

