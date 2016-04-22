<template>
    <nv-head :header-name="headerText"
            right-btn-type="showAddMenu"
            left-btn-type="">
    </nv-head>
    <nv-foot :footeritems="footeritems" :if-main-footer="true"></nv-foot>
</template>
<script>
    require('../assets/less/common/reset.less')
	import utils from  '../libs/utils'
    import iSlider from '../libs/iSlider'
    export default {
        data (){
            return {
                headerText:"工具",
                footeritems:[
                    {
                        class:'icon-tool',
                        text:'工具',
                        link:'toolsHome',
                        current:true
                    },
                    {
                        class:'icon-message',
                        text:'校园圈',
                        link:{name:'home',query:{tab:'topicList'}}
                    },
                    {
                        class:'icon-geren01',
                        text:'我',
                        link:'meHome'
                    }
                ]
            }
        },
        ready(){
        },
        attached(){
        },
        route:{
            data (transition){
                console.log(this.$route)
            }
        },
        methods:{
            
        },
        events:{
        },
        components:{
            "nvHead":require('../components/header.vue'),
            "nvFoot":require('../components/footer.vue')
            
        }
    }
</script>

<style lang="less">
@import '../assets/less/common/func.less';

</style>