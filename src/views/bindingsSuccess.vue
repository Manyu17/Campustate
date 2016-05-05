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
        width: 120px;
        height: 120px;
        border-radius: 50%;
        right: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        p{
            &:before{
                font-size: 40px;
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
                items: [],
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
                var self = this;
                if(self.backPath === '/dormBindings'){
                    $.ajax({
                        url: utils.urlpre+"Electric/cancel",
                        type: "POST",
                        crossDomain: true,
                        data: self.userdata,
                        dataType: "json",
                        success: function (data) {
                            console.log(data);
                            self.$route.router.go(self.backPath);
                        },
                        error: function (xhr, status) {
                            console.log('网络错误');
                        }
                    })
                }else if(self.backPath === '/affairsBindings'){
                    $.ajax({
                        url: utils.urlpre+"Grade/cancel",
                        type: "POST",
                        crossDomain: true,
                        data: self.userdata,
                        dataType: "json",
                        success: function (data) {
                            console.log(data);
                            self.$route.router.go(self.backPath);
                        },
                        error: function (xhr, status) {
                            console.log('网络错误');
                        }
                    })

                }else if(self.backPath === '/libraryBindings'){
                    $.ajax({
                        url: utils.urlpre+"Library/cancel",
                        type: "POST",
                        crossDomain: true,
                        data: self.userdata,
                        dataType: "json",
                        success: function (data) {
                            console.log(data);
                            self.$route.router.go(self.backPath);
                        },
                        error: function (xhr, status) {
                            console.log('网络错误');
                        }
                    })
                }
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
            if(self.backPath === '/dormBindings'){
                $.ajax({
                    url: utils.urlpre+"Electric/getBind",
                    type: "POST",
                    crossDomain: true,
                    data: self.userdata,
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        var campus = {
                            message: data.data.campus,
                            icon: 'icon iconfont icon-newlisticon06'
                        }
                        var floor = {
                            message: data.data.floor + ' ' + data.data.room_num,
                            icon: 'icon iconfont icon-newlisticon06'
                        }
                        self.items.push(campus);
                        self.items.push(floor);
                    },
                    error: function (xhr, status) {
                        console.log('网络错误');
                    }
                })
            }else if(self.backPath === '/affairsBindings'){
                var affair = {
                    message: '30920122202506',
                    icon: 'icon iconfont icon-newlisticon06'
                }
                self.items.push(affair);
            }else if(self.backPath === '/libraryBindings'){
                var affair = {
                    message: '30920122202506',
                    icon: 'icon iconfont icon-message'
                }
                self.items.push(affair);
            }
        }
    }
</script>