<template>
    <nv-head :header-name="headerText"
            right-btn-type=""
            left-btn-type="">
    </nv-head>
     <div class="tools-warp">
        <div class="tools-banner">
            
        </div>
        <div class="tools-top">
            <div class="tool">
                <div>
                    <span class="icon iconfont icon-message"></span>
                    <p>一卡通</p>
                </div>
            </div>
            <div class="tool">
                <div>
                    <span class="icon iconfont icon-message"></span>
                    <p>查成绩</p>
                </div>
            </div>
            <div class="tool">
                <div>
                    <span class="icon iconfont icon-message"></span>
                    <p>查电费</p>
                </div>
            </div>
        </div>

        <div class="tools-bottom">
            <div class="tool">
                <div>
                    <span class="icon iconfont icon-message"></span>
                    <p>GPA</p>
                </div>
            </div>
            <div class="tool">
                <div>
                    <span class="icon iconfont icon-message"></span>
                    <p>查课表</p>
                </div>
            </div>
            <div class="tool">
                <div>
                    <span class="icon iconfont icon-message"></span>
                    <p>图书馆</p>
                </div>
            </div>
        </div>
    </div>
    <nv-foot :footeritems="footeritems" :if-main-footer="true"></nv-foot>
</template>
<script>
    require('../assets/less/common/reset.less')
	import utils from  '../libs/utils'
    //import iSlider from '../libs/iSlider'
    export default {
        data (){
            return {
                headerText:"工具",
                footeritems:[
                    {
                        class:'icon-xingxing',
                        text:'工具',
                        link:'toolsHome',
                        current:true
                    },
                    {
                        class:'icon-iconfontusers',
                        text:'校园圈',
                        link:{name:'home',query:{tab:'topicList'}}
                    },
                    {
                        class:'icon-user',
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
.tools-warp{
    .tools-banner {
        width: 100%;
        height: 490px;
        background-color: @blue1;
        margin-bottom: 80px;
    }
    .tools-top,.tools-bottom {
        width: 580px;
        height: 165px;
        margin: 0 auto;
        border-bottom: 1px solid @font-gray3; /*no*/
        display: flex;
        justify-content: center;
        align-items: center;
        .flexbox();
        .tool{
            display: flex;
            flex:1.0;
            border-right: 1px solid @font-gray3; /*no*/
            height: 165px;
            justify-content: center;
            align-items: center;
            div  {
                height: 100px;
            }
        }
        .tool:nth-last-child(1){
            border: none;
        }
        span{
            &:before{
                font-size: 55px;
                display: inline-block;
                margin-bottom: 12px;
            }
        }
        p{
            font-size: 22px;
        }
    }
    .tools-bottom{
        border: none;
    }
}
</style>