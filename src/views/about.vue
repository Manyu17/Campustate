<style lang="less">
@import '../assets/less/common/func.less';
.about-container{
    position: absolute;
    top: 146px;
    left: 20px;
    right: 20px;
    .logo{
        color: @blue1;
        text-align: center;
        margin-bottom: 50px;
        #ch{
            font-size: 40px;
            font-family: '微软雅黑';
            font-weight: 600;
            margin-bottom: 10px;
            sup{
                margin-right: 20px;
                font-family: sans-serif;
            }
        }
        #eg{
            font-size: 30px;
            font-weight: 600;
            position: relative;
            left: 20px;
            font-family: sans-serif;
            sub{
                font-size: 45px;
                position: absolute;
                bottom: -10px;
                margin-left: 20px;
                font-family: sans-serif;
            }
        }
    }
    .summary {
        font-size: 24px; /*px*/
        line-height: 50px;
        background-color: @card-white5;
        padding: 40px 60px;
        color: @font-gray2;
    }
    .line {
        height: 570px;
        width: 2px; /*no*/
        background-color: @blue1;
        position: absolute;
        left: 20px;
        margin-top: 10px;
        margin-bottom: 30px;
    }
    .state-info, .tool-info {
        padding: 45px 20px 0 70px;
        font-size: 24px;
        color: @font-gray1;
        h1 {
            font-size: 30px;
            color: @blue1;
            position: relative;
            span {
                position: absolute;
                display: block;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: @card-white5;
                border: 6px solid @blue1;
                left: -60px;
                top: 5px;
            }
        }
        p {
            padding: 35px 0 0 25px;
            line-height: 45px;
        }
    }
}

</style>
<template>
    <nv-head header-name="系统介绍"
            left-btn-type="back">
    </nv-head>
    <div class="about-container">
        <div class="logo">
            <p id="ch"><sup>“</sup>嘿！校园邦</p>
            <p id="eg">Hey!Campustate<sub>”</sub></p>
        </div>
        <div class="summary">“校园邦”是一款集校园社交、资讯、生活功能为一体的应用，由贝壳工作室开发、运营、维护。于2016年初推出第一版。
        </div>
        <div class="line"></div>
        <div class="state-info">
            <h1>校园圈 <span></span></h1>
            <p>校园邦的社交因子。用户可选发布活动和喧喧两种形式。“活动”是社团或者其校园团体发布信息、参与报名的渠道；而“喧喧”是以个人身份发布的帖子，主要用于校园内开展话题讨论、或召集兴趣相近的伙伴等。</p>
        </div>
        <div class="tool-info">
            <h1>工具 <span></span></h1>
            <p>校园邦将会探索、推出一系列便利同学们生活出行的工具。</p>
        </div>
    </div>
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    export default {
        data (){
            return {
                backPath:''
            }
        },
        route:{
            data (transition){
                this.backPath = transition.from.path;
            }
        },
        components:{
            "nvHead":require('../components/header.vue')
        }
    }
</script>