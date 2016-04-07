<style lang="less">
@import '../assets/less/common/func.less';
.fill-info-warp{
    position: absolute;
    top: 146px;
    left: 20px;
    right: 20px;
    #mark {
        width: 100%;
        height: 220px;
        border: 1px solid @font-gray3; /*no*/
        padding: 20px;
        font-size: 32px;
        box-sizing: border-box;
        resize: none;
    }
    #captcha {
        width: 100%;
        height: 80px;
        border: 1px solid @font-gray3; /*no*/
        padding-left: 20px;
        font-size: 32px;
        box-sizing: border-box;
        margin-bottom: 15px;
    }
    #captcha {
        width: 100%;
        height: 80px;
        border: 1px solid @font-gray3; /*no*/
        padding-left: 20px;
        font-size: 32px;
        box-sizing: border-box;
        margin-bottom: 15px;
    }
    #tel-wrap {
        .flexbox();
        #tel {
            flex: 2.0;
            height: 80px;
            border: 1px solid @font-gray3; /*no*/
            padding-left: 20px;
            font-size: 32px;
            box-sizing: border-box;
            margin-bottom: 15px;
            margin-right: 15px;
        }
        a {
            flex: 1.0;
            height: 80px;
            line-height: 80px;
            background-color: @blue1;
            border-radius: 5px;
            color: @card-white5;
            font-size: 22px;
        }
        a.inactive{
            background-color: transparent;
            color: @font-gray2;
            font-size: 22px;
            border: 1px solid @font-gray2;/*no*/
        }
    }
}
</style>
<template>
    <nv-head header-name="报名"
            left-btn-type="back"
            right-btn-type="submit">
    </nv-head>
    <div class="fill-info-warp">
        <div id="tel-wrap">
            <input id="tel" type="text" placeholder="手机" v-model="tel" @blur="checkUsername">
            <send-captcha text = "发送验证码" :active.sync="captchaActive"></send-captcha>
        </div>
        <input id="captcha" type="text" placeholder="输入验证码" v-model="captcha" @blur="checkUsername">
        <textarea id="mark" placeholder="备注" v-model="mark"></textarea>
    </div>
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    export default {
        data (){
            return {
                backPath:'',
                captchaActive:false
            }
        },
        route:{
            data (transition){
                this.backPath = transition.from.path;
            }
        },
        methods:{
            checkUsername:function() {
                var result = utils.getCheck.checkPhone(this.tel);
                this.captchaActive = result;
                if (result) {
                    this.errormessage = '';
                }else{
                    this.errormessage = '请输入正确的手机号或邮箱';
                }
            },
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
            "send-captcha":require('../components/sendCaptcha.vue')
        }
    }
</script>