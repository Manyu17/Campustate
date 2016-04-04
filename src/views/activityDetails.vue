<template>
<nv-head header-name="活动详情"
        right-btn-type=""
        left-btn-type="back">
</nv-head>
<div class="topic-details-content">
    <div class="activities-box">
        <div class="detail-box clearfix">
            <span :class="{'ing':data.status==0,'ed':data.status==1,'close':data.status==2}">{{ data.status | getStatusStr }}</span>
            <h3>{{ data.title }}</h3>
            <div class="userinfo clearfix">
                <img :src="data.User.header" alt="" class="head-pic">
                <p class="date-time">{{ data.time | getLastTimeStr false}}</p>
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
    require('../assets/less/common/reset.less')
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
@import '../assets/less/common/func.less';
.topic-details-content{
    position: absolute;
    left: 0;
    right: 0;
    top: 5.5*16px;
    bottom: 6.125*16px;
    overflow-y: auto;
}
.activities-box{
    width: 37.5*16px;
    margin: 0 auto;
    margin-top: 18px;
    .detail-box{
        position: relative;
        width: 37.5*16px;
        background-color: @card-white5;
        margin-bottom: 24px;
        border-radius: 8px;
        h3{
            font-size: 28px;/*px*/
            font-weight: bold;
            height: 72px;
            line-height: 72px;
            padding-left: 120px;
            overflow: hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
            color: @font-gray1;
        }
        .ing,.ed,.close{
            position: absolute;
            top: 18px;
            left: -8px;
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
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-left: 20px;
            margin-right: 20px;
            float: left;
        }               
    }
    .userinfo{
        margin-bottom: 16px;
        p{
            font-size: 20px;/*px*/
            color: @font-gray2;
            line-height: 40px;
            height: 40px;
        }
    }
    .activity-info{
        width: 420px;
        margin: 0 auto;
        background-color: @background-gray4;
        padding: 20px 60px;
        border-radius: 6px;
        p{
            font-size: 28px;/*px*/
            color: @font-gray1;
            line-height: 1.8;
        }
        .apply-date,.max{
            font-size: 24px;/*px*/
            color: @font-gray2;
        }
        .address{
            margin-bottom: 10px;
            margin-top: 6px;
        }
    }
    .details{
        color: @font-gray1;
        font-size: 28px;/*px*/
        padding: 10px 38px;
        margin-top: 20px;
        line-height: 1.8;
    }
    .imgs-box{
        padding:0 20px 20px 20px;
        img{
            float: none;
            width: 128px;
            height: 128px;
            margin-right: 10px;
            border-radius: 6px;
        }
    }
    .comment-box{
        background-color: @card-white5;
    }
}
</style>