<style lang="less">
@import '../assets/less/common/func.less';
.comment-wrap{
    position: absolute;
    top: 106px;
    left: 20px;
    right: 20px;
    .comment {
        height: 260px;
        width: 100%;
        margin-bottom: 20px;
        background-color: @card-white5;
        .user-info-wrap{
            padding: 15px;
            display: flex;
            align-items: center;
            position: relative;
            img {
                width: 98px;
                height: 98px;
                border-radius: 50%;
            }
            .user-info {
                display: inline-block;
                height: 68px;
                margin-left: 15px;
                .user-name {
                    margin-bottom: 20px;
                    span {
                        color: @font-gray3;
                    }
                }
                .user-time {
                    color: @font-gray2;
                }
            }
            .icon {
                position: absolute;
                right: 25px;
                top: 25px;
                font-size: 30px;
            }
        }
        .content {
            margin-left: 20px;
            margin-right: 15px;
            margin-bottom: 15px;
        }
        .comment-info-wrap {
            margin-left: 15px;
            margin-right: 15px;
            margin-bottom: 15px;
            height: 75px;
            line-height: 75px;
            padding-left: 15px;
            padding-right: 15px;
            background-color: @background-gray4;
        }
    }
}
</style>
<template>
    <nv-head header-name="评论"
            left-btn-type="back">
    </nv-head>
    <div class="comment-wrap">
        <div v-for="comment in comments" class="comment">
            <div class="user-info-wrap">
                <img :src="comment.comment.user.header">
                <div class="user-info">
                    <p class="user-name"> {{comment.comment.user.nickname}} </p>
                    <p class="user-time"> {{comment.comment.time}} </p>
                </div>
                <span class="icon iconfont icon-message"></span>
            </div>
            <p class="content">{{comment.comment.content}}</p>
            <div class="comment-info-wrap"> {{comment.info.title}} </div>
        </div>
    </div>
</template>
<script>
    require('../assets/less/common/reset.less')
    require('../assets/less/iconfont/iconfont.css')
    import utils from  '../libs/utils'
    export default {
        data (){
            return {
                backPath:'',
                userdata: {},
                comments: []
            }
        },
        route:{
            data (transition){
                this.backPath = transition.from.path
            }
        },
        methods:{
        },
        events:{
            'headerLeftBtnClick':function() {
                this.$route.router.go(this.backPath);
            }
        },
        ready () {
            var self = this;
            self.userdata.user_id = window.localStorage.getItem('user_id');
            self.userdata.token = window.localStorage.getItem('token');

            $.ajax({
                url: utils.urlpre+"Comment/unreadComment",
                type: "POST",
                crossDomain: true,
                data: self.userdata,
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    self.comments = data.data;
                },
                error: function (xhr, status) {
                    console.log('网络错误');
                }
            })
        },
        components:{
            "nvHead":require('../components/header.vue'),
        }
    }
</script>