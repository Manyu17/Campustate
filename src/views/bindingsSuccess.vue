<style lang="less">
@import '../assets/less/common/func.less';
</style>
<template>
    <nv-head header-name="绑定成功"
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
                        message: '海韵二期'
                    },
                    {
                        icon: 'icon iconfont icon-message',
                        message: '海韵9'
                    },
                    {
                        icon: 'icon iconfont icon-message',
                        message: '606'
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
                status: "失败"
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
                this.$route.router.go(this.backPath)
            }
        },
        components:{
            "nvHead":require('../components/header.vue'),
            "info":require('../components/infoList.vue')
        }
    }
</script>