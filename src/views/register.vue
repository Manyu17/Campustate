<template>
	<div class="login-register-container" id="login-box">
        <div class="head-pic">
            <img src="../assets/images/logo.png" alt="">
        </div>
        <div class="error-message" v-if="errormessage">
            <p>{{ errormessage }}</p>
        </div>
        <div class="input-box">
            <p class="bottom-line"><span></span><input type="text" placeholder="邮箱地址/手机号" v-model="username" @blur="checkUsername"></p>
            <p class="bottom-line"><span></span><input type="text" placeholder="验证码" v-model="verify"><send-captcha text = "发送验证码" :active.sync="captchaActive" :username="username"></send-captcha></p>
            <p class="bottom-line"><span></span><input type="password" placeholder="密码" v-model="password"></p>
            <p><span></span><input type="password" placeholder="确认密码" v-model="comfirmpassword"></p>
        </div>
        
        <a class="button" v-link="{name:'login'}">登&nbsp;&nbsp;录</a>
        <a class="button main-btn" v-on:click="registerHandler">确 认 注 册</a>
    </div>
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    export default {
        data (){
            return {
                errormessage:'',
                username: '',
                verify:'',
                password: '',
                comfirmpassword:'',
                captchaActive:false
            }
        },
        route:{  
        },
        methods:{
            checkUsername:function() {
                var result = utils.getCheck.checkPhone(this.username)||utils.getCheck.checkEmail(this.username)
                this.captchaActive = result
                if (result) {
                    this.errormessage = ''
                }else{
                    this.errormessage = '请输入正确的手机号或邮箱'
                }
            },
            registerHandler:function () {
                var that = this
                var userdata = {
                    username: that.username,
                    verify: that.verify,
                    password: that.password
                }
                if (!that.username) {
                    that.errormessage = '用户名不能为空'
                }else if (!that.verify) {
                    that.errormessage = '验证码不能为空'
                }else if (!that.password) {
                    that.errormessage = '密码不能为空'
                }else{
                    $.ajax({
                        url: utils.urlpre+"Login/register",
                        type: "POST",
                        crossDomain: true,
                        data: userdata,
                        dataType: "json",
                        success: function (data) {
                            switch (data.result)
                            {
                                case 'SUCCESS':
                                    that.$route.router.go({ name: 'login'})
                                    break
                                case 'FAIL':
                                    that.errormessage = '注册失败，请重试'
                                    break
                            }
                               
                        },
                        error: function (xhr, status) {
                            this.errormessage = '网络错误'
                        }
                    })
                }
            }
        },
        events:{
            'verifySended':function() {
                this.errormessage = '验证码已发送'
            },
            'verifySendFault':function() {
                this.errormessage = '验证码发送失败，请重试'
            },
            'ajaxError':function() {
                this.errormessage = '网络错误'
            }
        },
        components:{
            "sendCaptcha":require('../components/sendCaptcha.vue')
        }
    }
</script>

<style lang="less">
@import '../assets/less/common/login-register.less';
</style>