<style lang="less">
@import '../assets/less/common/func.less';
</style>
<template>
    <nv-head header-name="活动信息"
            left-btn-type="back">
    </nv-head>
    <info :info-items="items" :info-navs="navs" :info-status="status"></info>
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