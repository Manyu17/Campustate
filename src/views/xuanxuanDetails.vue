<template>
<nv-head header-name="喧喧详情"
        right-btn-type=""
        left-btn-type="back">
</nv-head>
<div class="topic-details-content">
    <div class="xuanxuan-box" v-if="data.content" transition="fade">
        <div class="detail-box clearfix">
            <h3>{{ data.title }}</h3>
            <img :src="data.User.header" alt="" class="head-pic">
            <div class="rightside">
                <p class="date-time">{{ data.time | getLastTimeStr false}}</p>
                <p class="username">{{ data.User.nickname }}</p>
                <p class="detail">{{ data.content }}</p>
                <div class="imgs-box">
                    <img v-for="item in data.image" :src="item" alt="">
                </div>
            </div>
        </div>
        <comment :comment="data.comment" :comment-list="data.comment_list" :like="data.zan" :like-list="data.zan_list"></comment>
    </div>
</div>
<nv-foot :footeritems="footeritems" :zaned.sync="data.zaned" v-if="footerShow"></nv-foot>
<bottom-input-box v-if="!footerShow" :comment-content.sync="commentContent"></bottom-input-box>
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    export default {
        data (){
            return {
                data:{
                    noisy_id:this.$route.params.id,
                    user_id:'',
                    title:'',
                    content:'',
                    time:'',
                    image:[],
                    zan:'',
                    zan_list:'',
                    comment:'',
                    comment_list:'',
                    User:{
                        nickname: '',
                        header: ''
                    },
                    zaned:false
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
                    }
                ],
                commentContent:'',
                footerShow:true
            }
        },
        ready(){
            this.getXuanxuanDetails()
        },
        attached(){
        },
        route:{
            data (transition){
                this.backPath = transition.from.path
                this.data.noisy_id = transition.to.params.id
                
            },
            deactivate (transition){
                transition.next()
            }  
        },
        methods:{
            getXuanxuanDetails:function() {
                var localData = utils.getUseridAndToken()
                var __self = this
                var userdata = {
                    user_id:localData.user_id,
                    token:localData.token,
                    noisy_id:__self.data.noisy_id
                }
                $.ajax({
                    url: utils.urlpre+"Noisy/getNoisy",
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
                var localData = utils.getUseridAndToken()
                var __self = this
                var userdata = {
                    user_id:localData.user_id,
                    token:localData.token,
                    type:2,
                    father_id:__self.data.noisy_id,
                    content:__self.commentContent
                }
                $.ajax({
                    url: utils.urlpre+"Comment/addComment",
                    type: "POST",
                    crossDomain: true,
                    data:userdata,
                    dataType: "json",
                    success: function (data) {
                        if(data.result=="SUCCESS"){
                            __self.commentContent = ''
                            __self.getXuanxuanDetails()
                            __self.footerShow = true
                        }
                    },
                    error: function (xhr, status) {
                        console.log('error')
                    }
                })
            },
            'showCommentBox':function() {
                this.footerShow = false
            },
            'cancelZan':function() {
                var localData = utils.getUseridAndToken()
                var __self = this
                var userdata = {
                    user_id:localData.user_id,
                    token:localData.token,
                    type:2,
                    father_id:__self.data.noisy_id
                }
                $.ajax({
                    url: utils.urlpre+"Zan/removeZan",
                    type: "POST",
                    crossDomain: true,
                    data:userdata,
                    dataType: "json",
                    success: function (data) {
                        console.log(data)
                    },
                    error: function (xhr, status) {
                        console.log('error')
                    }
                })
            },
            'addZan':function() {
                var localData = utils.getUseridAndToken()
                var __self = this
                var userdata = {
                    user_id:localData.user_id,
                    token:localData.token,
                    type:2,
                    father_id:__self.data.noisy_id
                }
                $.ajax({
                    url: utils.urlpre+"Zan/addZan",
                    type: "POST",
                    crossDomain: true,
                    data:userdata,
                    dataType: "json",
                    success: function (data) {
                        console.log(data)
                    },
                    error: function (xhr, status) {
                        console.log('error')
                    }
                })
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
    .banner{
        width: 100%;
        height: 200px;
        text-align: center;
        overflow: hidden;
        img{
            width: 640px;
            height: 200px;
        }
    }
}

.xuanxuan-box{
    width: 37.5*16px;
    margin: 0 auto;
    margin-top: 18px;
    .detail-box{
        position: relative;
        width: 37.5*16px;
        background-color: @card-white5;
        margin-bottom: 24px;
        h3{
            font-size: 28px;/*px*/
            font-weight: bold;
            color: @font-gray1;
            height: 72px;
            line-height: 72px;
            padding-left: 28px;
            overflow: hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
        }
        .detail{
            font-size: 24px;/*px*/
            color: @font-gray1;
            margin-top: 1*16px;
            padding-right: 0.75*16px;
            line-height: 32px;
        }
        p{
            font-size: 24px;/*px*/
            line-height: 2;
            color: @font-gray1;
        }
        .date-time,.username{
            color: @font-gray2;
        }
        .like-num{
            padding-right: 32px;
        }
        .head-pic{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            float: left;
            margin-left: 28px;
            margin-right: 22px;
        }
    }
    
    .imgs-box{
        margin-top: 0.75*16px;
        margin-bottom: 14px;
        img{
            width: 132px;
            height: 132px;
            margin-right: 1*16px;
        }
    }
}
.rightside{
    float: left;
    width: 464px;
}
</style>