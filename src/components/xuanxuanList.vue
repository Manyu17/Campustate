<template>
    <ul class="topic-list" id="{{ listId }}">
        <li v-for="item in xuanxuanitems" v-link="{name:'xuanxuanDetails',params:{id:item.noisy_id}}">
            <h3>{{ item.title }}</h3>
            <img :src="item.image" alt="">
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
.topic-list{
    // display: none;
    list-style: none;
    li{
        position: relative;
        width: 37.5rem;
        height: 198/16rem;
        background-color: #fff;
        margin-bottom: 14/16rem;
        text-align: left;
        img{
            width: 64/16rem;
            height: 64/16rem;
            float: left;
            margin-left: 28/16rem;
            margin-right: 48/16rem;
        }
        .detail{
            font-size: 12px;
            color: #6f6e6e;
            padding-right: 0.75rem;
            line-height: 32/16rem;
            height: 64/16rem;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .info{
            position: absolute;
            font-size: 12px;
            color: #6f6e6e;
            right: 22/16rem;
            bottom: 1rem;
        }
        .date{
            padding-right: 14/16rem;
        }
        .time{
            padding-right: 20/16rem;
        }
        .like-num{
            padding-right: 32/16rem;
        }
    }
    h3{
        font-size: 14px;
        color: #6f6e6e;
        height: 72/16rem;
        line-height: 72/16rem;
        padding-left: 28/16rem;
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
    }
}
</style>