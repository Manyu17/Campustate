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
        text-align: center;
        a {
            display: block;
            width: 200px;
            height: 50px;
            line-height: 50px;
            margin: 0 auto;
            background-color: @blue1;
            color: @card-white5;
            border-radius: 5px;
        }
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
        <div class="update">
            <p v-if="versionData.result === 'FAIL' ">已有新版本：Campustate {{versionData.info[0].version_num}}</p>
            <a v-if="versionData.result === 'FAIL' " :href="versionData.info[0].ios_url">立即更新</a>
            <p v-if="versionData.result === 'SUCCESS' ">已是最新版本：Campustate {{version_id}}</p>
        </div>
        <div class="log" v-for=" i in versionData.info ">
            <h1>{{ i.version_num }} 版新功能</h1>
            <p>{{ i.version_log }}</p>
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
                version_id: 1,
                versionData: {}
            }
        },
        route:{
            data (transition){
                this.backPath = transition.from.path;
            }
        },
        ready () {
            var self = this;

            $.ajax({
                url: utils.urlpre+"Mussy/updateVersion",
                type: "GET",
                crossDomain: true,
                data: self.version_id,
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    self.versionData = data;
                },
                error: function (xhr, status) {
                    console.log('网络错误');
                }
            })
        },
        components:{
            "nvHead":require('../components/header.vue')
        }
    }
</script>