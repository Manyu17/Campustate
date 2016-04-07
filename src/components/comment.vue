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
                listShow:''
            }
        },
        ready(){
            if (this.commentList==0) {
                this.listShow = false
            }else{
                this.listShow = true
            }
            console.log(this.commentList)
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
@import '../assets/less/common/func.less';
.comment-box{
    background-color: @card-white5;
    padding: 0 24px 1*16px 24px;
    border-radius: 8px;
    .head{
        height: 64px;
        line-height: 64px;
        font-size: 28px;/*px*/
        color: @font-gray1;
        vertical-align: middle;
        
        .comment,.like{
            vertical-align: middle;
            &:before{
                display: inline-block;
                content: "";
                font-size: 40px;
                margin-right: 12px;
                line-height: 64px;
                vertical-align: middle;
            }
        }
        .like{
            margin-left: 40px;
        }
    }
    .comment-list{
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            float: left;
            margin-right: 36px;
            margin-top: 24px;
        }
        li{
            border-top: 1px solid @font-gray3;/*no*/
        }
    }
    .rightside{
        float: none;
        color: @font-gray1;
        line-height: 1.5;
        width: 28*16px;
    }
    .username{
        font-size: 24px;/*px*/
        margin-top: 1*16px;
    }
    .date-time{
        font-size: 20px;/*px*/
        color:@font-gray2;
    }
    .detail{
        font-size: 24px;/*px*/
        margin-bottom: 14px;
        margin-top: 10px;
        color: @font-gray1;
    }
    .date{
        padding-right: 14px;
    }
    .time{
        padding-right: 20px;
    }
    
}
</style>