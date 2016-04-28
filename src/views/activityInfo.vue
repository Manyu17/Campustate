<style lang="less">
@import '../assets/less/common/func.less';
.activity-info-wrap{
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
    <nv-head header-name="活动信息"
            left-btn-type="back">
    </nv-head>
    <div class="activity-info-wrap">
        <info :info-items="items" :info-navs="navs" :info-status="status"></info>
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
                items: [
                    {
                        icon: 'icon iconfont icon-newlisticon06',
                        message: '登山行动'
                    },
                    {
                        icon: 'icon iconfont icon-message',
                        message: '9月21日 10:00-17:00'
                    },
                    {
                        icon: 'icon iconfont icon-message',
                        message: '南普陀大门'
                    }
                ],
                navs: [
                    {
                        icon: 'icon iconfont icon-message',
                        message: '活动详情'
                    },
                    {
                        icon: 'icon iconfont icon-message',
                        message: '我的活动'
                    },
                    {
                        icon: 'icon iconfont icon-message',
                        message: '查看私信'
                    }
                ],
                status: {
                    tip: "通过",
                    classStatus: "success"
                }
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
            },
            'navClick': function(i) {
                if(i == 0){
                    //this.$route.router.go('/activityDetails', );
                }else if(i == 1){
                    //this.$route.router.go('/home');
                }else if(i == 2){
                    //this.$route.router.go('/home');
                }
            }
        },
        components:{
            "nvHead":require('../components/header.vue'),
            "info":require('../components/infoList.vue')
        }
    }
</script>