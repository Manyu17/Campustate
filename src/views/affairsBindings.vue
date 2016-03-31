<style lang="less">
@import '../assets/less/common/func.less';
.affairs-warp{
    position: absolute;
    top: 86px;
    width: 100%;
}
</style>
<template>
    <nv-head header-name="教务绑定"
            left-btn-type="back"
            right-btn-type="submit">
    </nv-head>
    <div class="affairs-warp">
        <banner :user-info="info"></banner>
        <input-list :input-lists="lists" :tip='tip'></input-list>
    </div>
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    export default {
        data (){
            return {
                backPath:'',
                tip: '输入教务系统账号密码获取信息',
                userDatas: [],
                info: {
                    name: "短毛羊绒球",
                    avatar: "http://7xpks6.com1.z0.glb.clouddn.com/FjBCDRqa-yvLYDNYElaa9ENaWc4X"
                },
                lists: [
                    {
                        type: "text",
                        placeholder: "学号"
                    },
                    {
                        type: "password",
                        placeholder: "密码"
                    }
                ]
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
            'headerRightBtnClick': function () {
                this.userDatas = [];
                var input = document.querySelectorAll('input');
                for (var i = 0; i < input.length; i++) {
                    this.userDatas.push(input[i].value);
                };
                console.log(this.userDatas);
            }
        },
        components:{
            "nvHead":require('../components/header.vue'),
            "banner":require('../components/avatarBanner.vue'),
            "inputList":require('../components/bindingsInput.vue')
        }
    }
</script>