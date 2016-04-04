<template>
    <ul class="event-list" id="{{ listId }}">
        <li v-for="item in activityitems" v-link="{name:'activityDetails',params:{id:item.activity_id}}">
            <span :class="{'ing':item.status==0,'ed':item.status==1,'close':item.status==2}">{{ item.status | getStatusStr }}</span>
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
@import '../assets/less/common/func.less';
.event-list{
    //display: none;
    list-style: none;
    li{
        position: relative;
        width: 37.5*16px;
        height: 254px;
        background-color: @card-white5;
        margin-bottom: 14px;
        text-align: left;
        border-radius: 6px;
    }
    h3{
        font-size: 28px;/*px*/
        line-height: 64px;
        padding-left: 116px;
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        color: @font-gray1;
    }
    .ing,.ed,.close{
        position: absolute;
        top: 18px;
        padding: 0 1*16px;
        height: 2*16px;
        line-height: 2*16px;
        font-size: 24px;/*px*/
        color: @card-white5;
    }
    .ing{
        background-color: @red1;
    }
    .ed{
        background-color: @icon2;
    }
    .close{
        background-color: @font-gray3;
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
        color: @font-gray1;
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
        color: @red1;
    }
}
</style>