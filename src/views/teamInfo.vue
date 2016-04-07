<style lang="less">
@import '../assets/less/common/func.less';
.team-container{
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
    .member-wrap {
        .flexbox();
        position: relative;
        background-color: @card-white5;
        color: @font-gray1;
        margin-bottom: 20px;
        padding: 25px;
        border: 1px solid @font-gray3; /*no*/
        overflow: hidden;
        .left{
            flex: 1.0;
            text-align: center;
            font-size: 22px;
            p {
                margin-top: 12px;
            }
            .avatar {
                width: 112px;
                height: 112px;
                border-radius: 50%;
                overflow: hidden;
                margin: 0 auto;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .right {
            flex: 2.0;
            text-align: left;
            margin-left: 80px;
            font-size: 24px;
            p {
                margin-top: 20px;
            }
            div {
                position: absolute;
                bottom: -80px;
                right: 50px;
                font-size: 40px;
                color: @font-gray3;
                width: 160px;
                height: 160px;
                border: 5px solid @font-gray3;
                text-align: center;
                border-radius: 50%;
                transform:rotate(-30deg);
                -webkit-transform:rotate(-30deg);
                line-height: 120px;
            }
        }
    }
}

</style>
<template>
    <nv-head header-name="团队介绍"
            left-btn-type="back">
    </nv-head>
    <div class="team-container">
        <div class="logo">
            <p id="ch"><sup>“</sup>你好！贝壳</p>
            <p id="eg">Hello ! Beike<sub>”</sub></p>
        </div>
        <div v-for="member in members" class="member-wrap">
            <div class="left">
                <div class="avatar">
                    <img :src="member.avatar" alt="">
                </div>
                <p>{{ member.chineseName }}</p>
                <p>{{ member.englishName }}</p>  
            </div>
            <div class="right">
                <p>{{ member.major }}</p>
                <p>{{ member.year }}</p>  
                <div>{{member.job}}</div>
            </div>
        </div>
    </div>
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    export default {
        data (){
            return {
                backPath:'',
                members: [{
                    avatar: "http://7xpks6.com1.z0.glb.clouddn.com/FjBCDRqa-yvLYDNYElaa9ENaWc4X",
                    chineseName: "贠轩",
                    englishName: "YUN XUAN",
                    major: "软件学院软件工程系",
                    year: "2012级本科",
                    job: "后台"
                },{
                    avatar: "http://7xpks6.com1.z0.glb.clouddn.com/FjBCDRqa-yvLYDNYElaa9ENaWc4X",
                    chineseName: "潘璐璐",
                    englishName: "PAN LULU",
                    major: "软件学院数字媒体工程系",
                    year: "2012级本科",
                    job: "前端"
                },{
                    avatar: "http://7xpks6.com1.z0.glb.clouddn.com/FjBCDRqa-yvLYDNYElaa9ENaWc4X",
                    chineseName: "李熳",
                    englishName: "LI MAN",
                    major: "软件学院数字媒体工程系",
                    year: "2012级本科",
                    job: "前端"
                }]
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