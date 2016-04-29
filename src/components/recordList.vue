<template>
<div class="record-list-box" :class="{'first':tabList[0].current,'second':tabList[1].current,'third':tabList[2].current}" v-if="dataList" transition="fade">
    <ul class="record-list-nav"  v-if="recordNavList">
        <li v-for="item in recordNavList" class="current">{{item}}</li>
    </ul>
    <ul class="record-list">
        <pay-record v-if="tabList[0].current&&dataList" v-for="item in dataList" :record-data="item"></pay-record>
        <use-record v-if="tabList[1].current&&dataList" v-for="item in dataList" :record-data="item"></use-record>
    </ul>
    
</div>
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    export default {
        props:['recordNavList','dataList','tabList'],
        data (){
            return {
                loadingStyle:{
                    top:0,
                    scale:'scale(0.4)',
                    opacity:0.4
                }
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
            "payRecord":require('./payRecord.vue'),
            "useRecord":require('./useRecord.vue'),
            "loading":require('./loading.vue')
            
        }
    }
</script>
<style lang="less" scope>
@import '../assets/less/common/func.less';
.record-list-box{
    background-color: @card-white5;
    border:2px solid rgb(226, 226, 226);/*no*/
    border-top: none;
    padding-top: 32px;
    padding-bottom: 20px;
    margin-bottom: 20px;
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
    margin: 24px auto;
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
</style>

