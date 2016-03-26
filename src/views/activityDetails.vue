<template>
<nv-head header-name="活动详情"
        right-btn-type=""
        left-btn-type="back">
</nv-head>
<div class="topic-details-content">
    <div class="activities-box">
        <div class="detail-box clearfix">
            <span class="ing">{{ status | getStatusStr }}</span>
            <h3>定向越野又来啦！参与赢大礼！</h3>
            <div class="userinfo clearfix">
                <img src="" alt="" class="head-pic">
                <p class="date-time"><span class="date">11-18</span></p>
                <p class="username">厦门大学登山协会</p>
            </div>
            <div class="activity-info">
                <p class="acti-date"><span class="date">12-02 </span><span class="time">11:00—17：30</span></p>
                <p class="apply-date"><span class="date">12-01 12：00 </span><span class="time">12:00</span>报名截止</p>
                <p class="address">厦大本部</p>
                <p class="apply">已有<span class="apply-num">38</span>人报名</p>
                <p class="max">限<span class="max-num">50</span>人</p>
            </div>
            <p class="details">厦门大学“安踏杯”第五届定向越野开始报名啦！活动设有神秘关卡，快与我们一同探险吧！参与即有机会参与抽奖</p>
            <div class="imgs-box">
                <img src="" alt=""><img src="" alt=""><img src="" alt="">
            </div>
        </div>
        <comment></comment>
    </div> 
</div>
</template>
<script>
    import utils from  '../libs/utils'
    export default {
        data (){
            return {
                activity_id:'',
                user_id:'',
                title:'',
                content:'',
                cover:'',
                image:'',
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
                    nickname: "heheda",
                    head: "1111"
                },
                zaned:'',
                applyed:''
                
            }
        },
        ready(){
        },
        attached(){
        },
        route:{
            data (transition){
                this.backPath = transition.from.path
                let id = transition.to.params.id
                if(id){
                    this.getXuanxuanDetails(id)
                }
            },
            deactivate (transition){
                transition.next();
            }  
        },
        methods:{
            getXuanxuanDetails:function() {
                
            }
        },
        events:{
            'headerLeftBtnClick':function() {
                this.$route.router.go(this.backPath)
            }
        },
        components:{
            "nvHead":require('../components/header.vue'),
            "footer":require('../components/footer.vue'),
            "comment":require('../components/comment.vue')
        }
    }
</script>

<style lang="less">
@import '../assets/less/common/viewBase.less';
</style>