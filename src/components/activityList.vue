<template>
    <ul class="event-list" id="{{ listId }}">
        <li v-for="item in activityitems" v-link="{name:'activityDetails',params:{id:item.activity_id}}">
            <span class="ing">{{ item.status | getStatusStr }}</span>
            <h3>{{ item.title }}</h3>
            <img :src="item.image" alt="">
            <p class="date">{{ item.start }} <span class="time">{{ item.start }}</span></p>
            <p class="address">{{ item.place }}</p>
            <p class="apply-num"><span class="num">{{ item.apply }}</span>报名</p>
        </li>
    </ul>
</template>

<script>
    export default {
        props: ['activityitems','listId'],
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
.event-list{
    //display: none;
    list-style: none;
    li{
        position: relative;
        width: 37.5rem;
        height: 254/16rem;
        background-color: #fff;
        margin-bottom: 14/16rem;
        text-align: left;
    }
    h3{
        font-size: 14px;
        line-height: 64/16rem;
        padding-left: 116/16rem;
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        color: #6f6e6e;
    }
    .ing,.ed{
        position: absolute;
        top: 18/16rem;
        padding: 0 1rem;
        height: 2rem;
        line-height: 2rem;
        font-size: 12px;
        color: #fff;
    }
    .ing{
        background-color: #ffa442;
    }
    .ed{
        background-color: #bbbbbb;
    }
    img{
        width: 226/16rem;
        height: 156/16rem;
        margin-left: 22/16rem;
        margin-right: 2rem;
        float: left;
    }
    p{
        font-size: 12px;
        color: #6f6e6e;
        line-height: 42/16rem;
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        &:before{
            display: inline-block;
            margin-right: 1rem;
        }
    }
    .date{
        margin-top: 1rem;
    }
    .num{
        padding-right: 8/16rem;
        color: #ffa442;
    }
}
</style>