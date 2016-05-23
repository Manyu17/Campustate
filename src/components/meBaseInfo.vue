<template>
<div class="base-info-box">
    <div class="g-circle">
        <img :src="baseData.header" alt="" class="head-pic">
        <div class="follow" @click="goFocusList">
            <p class="num">{{baseData.focus}}</p>
            <p class="t-follow">关注</p>
        </div>
        <div class="fans" @click="goFansList">
            <p class="num">{{baseData.follow}}</p>
            <p class="t-fans">粉丝</p>
        </div>
    </div>
    <p class="username">{{baseData.nickname}}</p>
    <p class="state"><span class="c-state">{{baseData.introduction}}</span></p>
</div>
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    export default {
        props:['baseData'],
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
            goFocusList:function() {
                this.$route.router.go({name:'userList',params:{type:'focus',username:this.baseData.user_id}})
            },
            goFansList:function() {
                this.$route.router.go({name:'userList',params:{type:'fans',username:this.baseData.user_id}})
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
.base-info-box{
    width: 100%;
    background-color: @blue1;
    background-image:linear-gradient(to top,@blue2,@blue1);
    p{
        text-align: center;
        line-height: 2;
        color: @card-white5;
    }
    .username{
        font-size: 40px;/*px*/
        height: 80px;/*px*/
    }
    .state{
        font-size: 32px;/*px*/
        height: 64px;/*px*/
        padding-bottom: 40px;
    }
}
.g-circle{
    position: relative;
    text-align: center;
    .head-pic{
        width: 168px;
        height: 168px;
        border-radius: 50%;
        border: 2px solid @card-white5;/*no*/
        margin-top: 48px;
        margin-bottom: 20px;
    }
    div{
        width: 116px;
        height: 116px;
        border-radius: 50%;
        border: 1px solid @card-white5;/*no*/
        background-color: @blue2;
        position: absolute;
        top: 72px;
    }
    .follow{
        left: 68px;
    }
    .fans{
        right: 68px;
    }
    p{
        font-size: 24px;/*px*/
        color: @card-white5;
        text-align: center;
        height: 36px;/*px*/
        line-height: 1.5;
    }
    .num{
        margin-top: 20px;
    }
}
</style>