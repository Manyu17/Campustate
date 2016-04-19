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
    <toast toast-info="toast" v-if="showToast"></toast>
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
                userdata: {},
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
                ],
                toast: {
                    text: 'xxx',
                    icon: 'submit'
                },
                showToast: false
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
                console.log(self.userDatas);
                self.userdata.user_id = window.localStorage.getItem('user_id');
                self.userdata.token = window.localStorage.getItem('token');
                self.userdata.schoolnum = self.userDatas[0];
                self.userdata.schoolpwd = self.userDatas[1];
                // $.ajax({
                //     url: utils.urlpre+"Grade/bindGrade",
                //     type: "POST",
                //     crossDomain: true,
                //     data: self.userdata,
                //     dataType: "json",
                //     success: function (data) {
                //         console.log(data);
                //     },
                //     error: function (xhr, status) {
                //         console.log('网络错误');
                //     }
                // })
                console.log(self.userdata.user_id);
                console.log(self.userdata.token);
                $.ajax({
                    url: utils.urlpre+"Timetable/getTimetable",
                    type: "POST",
                    crossDomain: true,
                    data: {
                        user_id: '3',
                        token: '1234qwer',
                        term_code: 20141
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                    },
                    error: function (xhr, status) {
                        console.log('网络错误');
                    }
                })
            }
        },
        components:{
            "nvHead":require('../components/header.vue'),
            "banner":require('../components/avatarBanner.vue'),
            "inputList":require('../components/bindingsInput.vue'),
            "toast":require('../components/toast.vue')
        }
    }
</script>