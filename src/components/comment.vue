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
    padding: 0 24/16rem 1rem 24/16rem;
    .head{
        height: 64/16rem;
        line-height: 64/16rem;
        font-size: 12px;
        color: #6c6c6c;
        vertical-align: middle;
        position: relative;
        &:before{
            display: inline-block;
            content: "";
            background-color: #c1c1c1;
            width: 28/16rem;
            height: 28/16rem;
            border-radius: 50%;
            margin-right: 20/16rem;
            line-height: 64/16rem;
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
            width: 60/16rem;
            height: 60/16rem;
            float: left;
            margin-right: 36/16rem;
            margin-top: 24/16rem;
        }
        li{
            border-top: 2px solid #cdcdcd;
        }
    }
    .rightside{
        color: #6b6b6b;
        line-height: 1.5;
        width: 28rem;
    }
    .username{
        font-size: 12px;
        margin-top: 1rem;
    }
    .date-time{
        font-size: 12px;
    }
    .detail{
        font-size: 10px;
        margin-bottom: 14/16rem;
        margin-top: 10/16rem;
    }
    .date{
        padding-right: 14/16rem;
    }
    .time{
        padding-right: 20/16rem;
    }
    
}
</style>