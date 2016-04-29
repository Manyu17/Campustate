<style lang="less">
@import '../assets/less/common/func.less';
.affairs-warp{
    position: absolute;
    top: 86px;
    width: 100%;
}
</style>
<template>
    <nv-head header-name="图书馆绑定"
            left-btn-type="back"
            right-btn-type="submit">
    </nv-head>
    <div class="affairs-warp">
        <banner></banner>
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
                tip: '输入图书馆账号密码获取信息',
                userDatas: [],
                userdata: {},
                lists: [
                    {
                        type: "password",
                        placeholder: "图书馆密码"
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
                var self = this;
                self.userDatas = [];
                var input = document.querySelectorAll('input');
                for (var i = 0; i < input.length; i++) {
                    self.userDatas.push(input[i].value);
                };
                self.userdata.user_id = window.localStorage.getItem('user_id');
                self.userdata.token = window.localStorage.getItem('token');
                self.userdata.librarypwd = self.userDatas[0];
                if(self.userdata.librarypwd !== ''){
                    $.ajax({
                        url: utils.urlpre+"Library/bindLibrary",
                        type: "POST",
                        crossDomain: true,
                        data: self.userdata,
                        dataType: "json",
                        success: function (data) {
                            console.log(data);
                            self.$route.router.go('/bindingsSuccess');
                        },
                        error: function (xhr, status) {
                            console.log('网络错误');
                        }
                    })
                }
            }
        },
        components:{
            "nvHead":require('../components/header.vue'),
            "banner":require('../components/avatarBanner.vue'),
            "inputList":require('../components/bindingsInput.vue')
        }
    }
</script>