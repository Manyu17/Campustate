<style lang="less">
@import '../assets/less/common/func.less';
.update-container{
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
    .update {
        font-size: 24px; /*px*/
        line-height: 50px;
        background-color: @card-white5;
        padding: 40px 60px;
        color: @font-gray2;
    }
    .log {
        padding: 45px 20px 0 20px;
        font-size: 24px;
        color: @font-gray1;
        h1 {
            font-size: 30px;
            height: 50px;
            line-height: 50px;
            padding-left: 30px;
            border-left: 10px solid @blue1; 
        }
        p {
            padding: 35px 0 0 70px;
            line-height: 45px;
        }
    }
}

</style>
<template>
    <nv-head header-name="版本更新"
            left-btn-type="back">
    </nv-head>
    <div class="update-container">
        <div class="logo">
            <p id="ch"><sup>“</sup>更完备的功能</p>
            <p id="eg">New Version</p>
            <p id="eg">Complete Functions<sub>”</sub></p>
        </div>
        <div class="update">“校园邦”是一款集校园社交、资讯、生活功能为一体的应用，由贝壳工作室开发、运营、维护。于2016年初推出第一版。
        </div>
        <div class="log">
            <h1>校园圈</h1>
            <p>校园邦的社交因子。用户可选发布活动和喧喧两种形式。“活动”是社团或者其校园团体发布信息、参与报名的渠道；而“喧喧”是以个人身份发布的帖子，主要用于校园内开展话题讨论、或召集兴趣相近的伙伴等。</p>
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