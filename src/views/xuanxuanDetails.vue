<template>
<nv-head header-name="喧喧详情"
        right-btn-type=""
        left-btn-type="back">
</nv-head>
<div class="topic-details-content">
    <div class="xuanxuan-box">
        <div class="detail-box clearfix">
            <h3>{{ data.title }}</h3>
            <img :src="data.User.header" alt="" class="head-pic">
            <div class="rightside">
                <p class="date-time">{{ data.time | getLastTimeStr false}}</p>
                <p class="username">{{ data.User.nickname }}</p>
                <p class="detail">{{ data.content }}</p>
                <div class="imgs-box">
                    <!-- <img v-for="item in data.image" :src="item" alt=""> -->
                </div>
            </div>
        </div>
        <comment :comment="data.comment" :comment-list="data.comment_list" :like="data.zan" :like-list="data.zan_list"></comment>
    </div>
</div>
<nv-foot :footeritems="footeritems"></nv-foot>
</template>
<script>
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
                ]
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
            }
        },
        components:{
            "nvHead":require('../components/header.vue'),
            "nvFoot":require('../components/footer.vue'),
            "comment":require('../components/comment.vue')
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
    .banner{
        width: 100%;
        height: 200/16rem;
        text-align: center;
        overflow: hidden;
        img{
            width: 640/16rem;
            height: 200/16rem;
        }
    }
}

.xuanxuan-box{
    width: 37.5rem;
    margin: 0 auto;
    margin-top: 18/16rem;
    .detail-box{
        position: relative;
        width: 37.5rem;
        background-color: #fff;
        margin-bottom: 24/16rem;
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
        .detail{
            font-size: 12px;
            color: #6f6e6e;
            margin-top: 1rem;
            padding-right: 0.75rem;
            line-height: 32/16rem;
        }
        p{
            font-size: 12px;
            line-height: 2;
            color: #6f6e6e;
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
        .head-pic{
            width: 64/16rem;
            height: 64/16rem;
            float: left;
            margin-left: 28/16rem;
            margin-right: 22/16rem;
        }
    }
    
    .imgs-box{
        margin-top: 0.75rem;
        margin-bottom: 14/16rem;
        img{
            width: 132/16rem;
            height: 132/16rem;
            margin-right: 1rem;
        }
    }
}
.rightside{
    float: left;
    width: 464/16rem;
}
</style>