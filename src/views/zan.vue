<style lang="less">
@import '../assets/less/common/func.less';
.zan-wrap{
    position: absolute;
    top: 106px;
    left: 20px;
    right: 20px;
    .zan {
        height: 220px;
        width: 100%;
        margin-bottom: 20px;
        background-color: @card-white5;
        .user-info-wrap{
            padding: 15px;
            display: flex;
            align-items: center;
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
        }
        .zan-info-wrap {
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
    <nv-head header-name="点赞"
            left-btn-type="back">
    </nv-head>
    <div class="zan-wrap">
        <div v-for="zan in zans" class="zan">
            <div class="user-info-wrap">
                <img :src="zan.user.header">
                <div class="user-info">
                    <p class="user-name"> {{zan.user.nickname}} <span>赞了我</span> </p>
                    <p class="user-time"> {{zan.time}} </p>
                </div>
            </div>
            <div class="zan-info-wrap"> {{zan.info.title}} </div>
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
                zans: []
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
                url: utils.urlpre+"Zan/unreadZan",
                type: "POST",
                crossDomain: true,
                data: self.userdata,
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    self.zans = data.data;
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