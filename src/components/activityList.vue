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
        width: 37.5*16px;
        height: 254px;
        background-color: #fff;
        margin-bottom: 14px;
        text-align: left;
    }
    h3{
        font-size: 28px;/*px*/
        line-height: 64px;
        padding-left: 116px;
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        color: #6f6e6e;
    }
    .ing,.ed{
        position: absolute;
        top: 18px;
        padding: 0 1*16px;
        height: 2*16px;
        line-height: 2*16px;
        font-size: 24px;/*px*/
        color: #fff;
    }
    .ing{
        background-color: #ffa442;
    }
    .ed{
        background-color: #bbbbbb;
    }
    img{
        width: 226px;
        height: 156px;
        margin-left: 22px;
        margin-right: 2*16px;
        float: left;
    }
    p{
        font-size: 24px;/*px*/
        color: #6f6e6e;
        line-height: 42px;
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        &:before{
            display: inline-block;
            margin-right: 1*16px;
        }
    }
    .date{
        margin-top: 1*16px;
    }
    .num{
        padding-right: 8px;
        color: #ffa442;
    }
}
</style>