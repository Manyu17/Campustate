<template>
<ul class="person-info-list">
    <li v-for=" item in userListData" class="person-info-item">
        <img :src="item.header" alt="" class="head-pic">
        <div class="intro">
            <p class="username">{{item.nickname}}</p>
            <p class="college">{{item.introduction}}</p>
        </div>
        <a class="icon iconfont follow-state" :class="{'focus':item.focus,'icon-gongtongguanzhu':item.focus,'icon-concern':!item.focus}" @click = "switchFocus(item)">{{item.focus | getFocusStr}}</a>
    </li>
</ul>
</template>
<script>
    require('../assets/less/iconfont/iconfont.css')
    import utils from  '../libs/utils'
    export default {
        props: ['userListData'],
        data (){
            return {
                
            }
        },
        ready(){
        },
        attached(){
        },
        methods:{
            switchFocus:function(item) {
                var __self = this
                var userData = {}
                var localData = utils.getUseridAndToken()
                userData.user_id = localData.user_id
                userData.token = localData.token
                userData.type = 1
                userData.focused_id = item.user_id
                item.focus = !item.focus
                if(!item.focus){//如果已关注 取消关注
                    $.ajax({
                        url: utils.urlpre+"Focus/unFocus",
                        type: "POST",
                        crossDomain: true,
                        data:userData,
                        dataType: "json",
                        success: function (data) {
                            console.log('unFocus success')
                            console.log(item.focus)
                        },
                        error: function (xhr, status) {//取消关注失败
                            console.log('unFocus error')
                            item.focus = 1
                        }
                    })
                }else{//如果没关注 加关注
                    $.ajax({
                        url: utils.urlpre+"Focus/focus",
                        type: "POST",
                        crossDomain: true,
                        data:userData,
                        dataType: "json",
                        success: function (data) {
                            console.log('Focus success')
                            console.log(item.focus)
                        },
                        error: function (xhr, status) {//关注失败
                            console.log('unFocus error')
                            item.focus = 0
                        }
                    })
                }
                
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
.person-info-list{
    width: 600px;
    margin: 0 auto;
    background-color: @card-white5;
}
.person-info-item{
    width: 560px;   
    height: 104px;
    padding: 24px 20px;
    position: relative;
    .flexbox();
    img{
        width: 100px;
        height: 100px;
        float: left;
        margin-right: 32px;
    }
    .intro{
        flex:1;
    }
    p{
        color: @font-gray1;
        height: 52px;
        line-height: 52px;
        text-align: left;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
    .username{
        font-size: 30px; /*px*/
    }
    .college{
        font-size: 24px; /*px*/
    }
    .follow-state.focus{
        color: @blue1;
    }
    .follow-state{
        display: block;
        line-height: 62px;
        text-align: center;
        font-size: 22px;/*px*/
        margin-right: 20px;
        color: @font-gray2;
        &:before{
            display: block;
            text-align: center;
            font-size: 40px;/*px*/
        }
    }
}
</style>