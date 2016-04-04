<template>
    <ul class="topic-list" id="{{ listId }}">
        <li v-for="item in xuanxuanitems" v-link="{name:'xuanxuanDetails',params:{id:item.noisy_id}}">
            <h3>{{ item.title }}</h3>
            <img :src="item.User.header" alt="">
            <p class="detail">{{ item.content }}</p>
            <p class="info">
                <time>{{item.time | getLastTimeStr true}}</time>
                <!-- <span class="date">{{ item.date }}</span><span class="time">{{ item.time }}</span> -->
                <span class="like">赞</span><span class="like-num">{{ item.zan }}</span>
                <span class="comment">评论</span><span class="comment-num">{{ item.comment }}</span>
            </p>
        </li>
    </ul>
</template>

<script>
    export default {
        props: ['xuanxuanitems','listId'],
        data (){
            return {
                
            }
        },
        route:{

        },
        methods:{
            
        },
        components:{
            
        }
    }
</script>
<style lang="less">
@import '../assets/less/common/func.less';
.topic-list{
    // display: none;
    list-style: none;
    li{
        position: relative;
        width: 37.5*16px;
        height: 198px;
        background-color: @card-white5;
        margin-bottom: 14px;
        text-align: left;
        border-radius: 6px;
        img{
            width: 64px;
            height: 64px;
            float: left;
            margin-left: 28px;
            margin-right: 48px;
        }
        .detail{
            font-size: 24px;/*px*/
            color: @font-gray1;
            padding-right: 0.75*16px;
            line-height: 32px;
            height: 64px;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .info{
            position: absolute;
            font-size: 24px;/*px*/
            color: @font-gray1;
            right: 22px;
            bottom: 1*16px;
        }
        .date{
            padding-right: 14px;
        }
        .time{
            padding-right: 20px;
        }
        .like-num{
            padding-right: 32px;
        }
    }
    h3{
        font-size: 28px;/*px*/
        color: @font-gray1;
        height: 72px;
        line-height: 72px;
        padding-left: 28px;
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
    }
}
</style>