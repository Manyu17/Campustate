<style lang="less">
@import '../assets/less/common/func.less';
.myapply-wrap{
    position: absolute;
    top: 106px;
    left: 20px;
    right: 20px;
    .myapply {
        height: 200px;
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
        }
        .content {
            margin-left: 20px;
            margin-right: 15px;
            margin-bottom: 15px;
            height: 55px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>
<template>
    <nv-head header-name="报名消息"
            left-btn-type="back">
    </nv-head>
    <div class="myapply-wrap">
        <div v-for="myapply in myapplys" class="myapply">
            <div class="user-info-wrap">
                <img :src="myapply.User.header">
                <div class="user-info">
                    <p class="user-name"> {{myapply.User.nickname}} </p>
                    <p class="user-time"> {{myapply.updated_at}} </p>
                </div>
            </div>
            <p class="content">{{myapply.text}}</p>
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
                myapplys: []
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
                url: utils.urlpre+"Member/myApply",
                type: "POST",
                crossDomain: true,
                data: self.userdata,
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    self.myapplys = data.data;
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