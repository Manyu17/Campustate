<style lang="less">
@import '../assets/less/common/func.less';
.success-warp{
    position: absolute;
    top: 86px;
    width: 100%;
    .unbindings {
        position: absolute;
        background-color: @blue1;
        color: @card-white5;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        right: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        p{
            &:before{
                font-size: 45px;
                margin-bottom: 12px;
            }
        }
        p{
            font-size: 22px;
        }
    }
}
</style>
<template>
    <nv-head header-name="绑定成功"
            left-btn-type="back">
    </nv-head>
    <div class='success-warp'>
        <banner></banner>
        <info :info-items="items" :info-navs="navs" :info-status="status"></info>
        <div class="unbindings" v-on:click="cancel()">
            <div>
                <p class="icon iconfont icon-message"></p>
                <p>解绑</p>
            </div>        
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
                items: [
                    {
                        icon: 'icon iconfont icon-newlisticon06',
                        message: ''
                    },
                    {
                        icon: 'icon iconfont icon-message',
                        message: ''
                    }
                ],
                navs: [
                    {
                        icon: 'icon iconfont icon-message',
                        message: '解除绑定'
                    },
                    {
                        icon: 'icon iconfont icon-message',
                        message: '重新绑定'
                    },
                    {
                        icon: 'icon iconfont icon-message',
                        message: '返回首页'
                    }
                ],
                status: {
                    tip: "已绑定",
                    classStatus: "success"
                }
            }
        },
        route:{
            data (transition){
                this.backPath = transition.from.path;
                console.log(this.backPath);
            }
        },
        methods:{
            cancel: function() {

            }
        },
        events:{
            'headerLeftBtnClick':function() {
                this.$route.router.go(this.backPath);
            },
            'navClick': function(i) {
                
                if(i == 2){
                    console.log(i);
                    this.$route.router.go('/home');
                }
            }
        },
        components:{
            "nvHead":require('../components/header.vue'),
            "banner":require('../components/avatarBanner.vue'),
            "info":require('../components/infoList.vue')
        },
        ready () {
            var self = this;
            self.userdata.user_id = window.localStorage.getItem('user_id');
            self.userdata.token = window.localStorage.getItem('token');
            $.ajax({
                url: utils.urlpre+"Electric/getBind",
                type: "POST",
                crossDomain: true,
                data: self.userdata,
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    self.items[0].message = data.data.campus;
                    self.items[1].message = data.data.floor + ' ' + data.data.room_num;
                },
                error: function (xhr, status) {
                    console.log('网络错误');
                }
            })
        }
    }
</script>