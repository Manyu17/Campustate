<template>
<div class="comment-box">
    <p class="head"><span class="comment">评论<span class="comment-num">{{ comment }}</span></span><span class="like">赞<span class="like-num">{{ like }}</span></span></p>
    <ul class="comment-list" v-if="listShow">
        <li class="clearfix" v-for="item in commentList">
            <img :src="item.User.header" alt="">
            <div class="rightside">
                <p class="username">{{ item.User.nickname }}</p>
                <p class="date-time">{{item.time | getLastTimeStr true}}</p>
                <p class="detail">{{ item.content }}</p>
            </div>
        </li>
    </ul>
</div>
</template>
<script>
    import utils from  '../libs/utils'
    export default {
        props: ['comment','commentList','like','likeList'],
        data (){
            return {
                listShow:false
            }
        },
        ready(){
        },
        attached(){
            
        },
        watch:{
            commentList:function(val,old){
                if(val!=0){
                    this.listShow = true
                }
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
@import '../assets/less/common/componentBase.less';
.comment-box{
    background-color: #fff;
    padding: 0 24px 1*16px 24px;
    .head{
        height: 64px;
        line-height: 64px;
        font-size: 24px;/*px*/
        color: #6c6c6c;
        vertical-align: middle;
        position: relative;
        &:before{
            display: inline-block;
            content: "";
            background-color: #c1c1c1;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            margin-right: 20px;
            line-height: 64px;
            vertical-align: middle;
        }
        .comment,.like{
            vertical-align: middle;
        }
        .like{
            position: absolute;
            right: 0;
        }
    }
    .comment-list{
        img{
            width: 60px;
            height: 60px;
            float: left;
            margin-right: 36px;
            margin-top: 24px;
        }
        li{
            border-top: 2px solid #cdcdcd;
        }
    }
    .rightside{
        color: #6b6b6b;
        line-height: 1.5;
        width: 28*16px;
    }
    .username{
        font-size: 24px;/*px*/
        margin-top: 1*16px;
    }
    .date-time{
        font-size: 24px;/*px*/
    }
    .detail{
        font-size: 20px;/*px*/
        margin-bottom: 14px;
        margin-top: 10px;
    }
    .date{
        padding-right: 14px;
    }
    .time{
        padding-right: 20px;
    }
    
}
</style>