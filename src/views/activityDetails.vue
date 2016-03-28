<template>
<nv-head header-name="活动详情"
        right-btn-type=""
        left-btn-type="back">
</nv-head>
<div class="topic-details-content">
    <div class="activities-box">
        <div class="detail-box clearfix">
            <span class="ing">{{ data.status | getStatusStr }}</span>
            <h3>{{ data.title }}</h3>
            <div class="userinfo clearfix">
                <img :src="data.User.header" alt="" class="head-pic">
                <p class="date-time"><span class="date">{{ data.time | getLastTimeStr false}}</span></p>
                <p class="username">{{ data.User.nickname }}</p>
            </div>
            <div class="activity-info">
                <p class="acti-date">{{ data.start | getLastTimeStr false}}-{{ data.end | getLastTimeStr false }}</p>
                <p class="apply-date">{{ data.apply_end | getLastTimeStr false}} 报名截止</p>
                <p class="address">{{ data.place }}</p>
                <p class="apply">已有{{ data.apply }}人报名</p>
                <p class="max">限{{ data.require }}人</p>
            </div>
            <p class="details">{{ data.content }}</p>
            <div class="imgs-box">
                <img v-for="item in data.image" :src="item" alt="">
            </div>
        </div>
        <comment :comment="data.comment" :comment-list="data.comment_list" :like="data.zan" :like-list="data.zan_list"></comment>
    </div> 
</div>
<nv-foot :footeritems="footeritems" v-if="footerShow"></nv-foot>
<bottom-input-box v-if="!footerShow" :comment-content.sync="commentContent"></bottom-input-box>
</template>
<script>
    import utils from  '../libs/utils'
    export default {
        data (){
            return {
                data:{
                    activity_id:this.$route.params.id,
                    user_id:'',
                    title:'',
                    content:'',
                    cover:'',
                    image:[],
                    time:'',
                    start:'',
                    end:'',
                    phone_needed:'',
                    place:'',
                    apply_end:'',
                    require:'',
                    apply:'',
                    zan:'',
                    zan_list:'',
                    comment:'',
                    comment_list:'',
                    duration:'',
                    status:'',
                    User:{
                        nickname: '',
                        header: ''
                    },
                    zaned:'',
                    applyed:'',
                },
                backPath:'',
                footeritems:[
                    {
                        class:'icon-tool',
                        text:'评论',
                        link:''
                    },
                    {
                        class:'icon-message',
                        text:'点赞',
                        link:''
                    },
                    {
                        class:'icon-geren01',
                        text:'立即报名',
                        link:''
                    }
                ],
                commentContent:'',
                footerShow:true
                
            }
        },
        ready(){
            this.getActivityDetails()
            console.log(this.$route.params.id)
        },
        attached(){
        },
        route:{
            data (transition){
                this.backPath = transition.from.path
                this.data.activity_id = transition.to.params.id
            },
            deactivate (transition){
                transition.next();
            }  
        },
        methods:{
            getActivityDetails:function() {
                var localData = utils.getUseridAndToken()
                var __self = this
                var userdata = {
                    user_id:localData.user_id,
                    token:localData.token,
                    activity_id:__self.data.activity_id
                }
                $.ajax({
                    url: utils.urlpre+"Activity/getActivity",
                    type: "POST",
                    crossDomain: true,
                    data:userdata,
                    dataType: "json",
                    success: function (data) {
                        __self.data = data.data
                        console.log(data)
                    },
                    error: function (xhr, status) {
                        console.log('error')
                    }
                })
            }
        },
        events:{
            'headerLeftBtnClick':function() {
                this.$route.router.go(this.backPath)
            },
            'commitComment':function() {
                
            }
        },
        components:{
            "nvHead":require('../components/header.vue'),
            "nvFoot":require('../components/footer.vue'),
            "comment":require('../components/comment.vue'),
            "bottomInputBox":require('../components/bottomInputBox.vue')
        }
    }
</script>

<style lang="less">
@import '../assets/less/common/viewBase.less';
.topic-details-content{
    position: absolute;
    left: 0;
    right: 0;
    top: 5.5rem;
    bottom: 6.125rem;
    overflow-y: auto;
    background-color: @color2;
}
.activities-box{
    width: 37.5*16/16rem;
    margin: 0 auto;
    margin-top: 18/16rem;
    .detail-box{
        position: relative;
        width: 37.5*16/16rem;
        background-color: #dfdede;
        margin-bottom: 24/16rem;
        h3{
            font-size: 14/16rem;
            height: 64/16rem;
            line-height: 64/16rem;
            padding-left: 100/16rem;
            overflow: hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
            color: #6f6e6e;
        }
        .ing,.ed{
            position: absolute;
            top: 18/16rem;
            left: -8/16rem;
            padding: 0 1*16/16rem;
            height: 2*16/16rem;
            line-height: 2*16/16rem;
            font-size: 12/16rem;
            color: #fff;
        }
        .ing{
            background-color: #ffa442;
        }
        .ed{
            background-color: #bbbbbb;
        }
        img{
            width: 60/16rem;
            height: 60/16rem;
            margin-left: 6/16rem;
            margin-right: 20/16rem;
            float: left;
        }               
    }
    .userinfo{
        margin-bottom: 12/16rem;
        p{
            font-size: 10/16rem;
            color: #b3b3b3;
        }
    }
    .activity-info{
        width: 502/16rem;
        margin: 0 auto;
        background-color: #f1f1f1;
        padding: 20/16rem 40/16rem;
        p{
            font-size: 14/16rem;
            color: #5a5a5a;
            line-height: 1.5;
        }
        .apply-date,.max{
            font-size: 12/16rem;
            color: #9a9a9a;
        }
        .address{
            margin-bottom: 10/16rem;
            margin-top: 6/16rem;
        }
    }
    .details{
        color: #515151;
        font-size: 14/16rem;
        padding: 10/16rem 22/16rem;
        margin-top: 20/16rem;
        line-height: 1.5;
    }
    .imgs-box{
        padding:0 20/16rem 20/16rem 20/16rem;
        img{
            float: none;
            width: 128/16rem;
            height: 128/16rem;
            margin-right: 10/16rem;
        }
    }
    .comment-box{
        background-color: #dfdede;
    }
}
</style>