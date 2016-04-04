<template>
	<div class="login-register-container" id="login-box">
        <div class="head-pic">
            <img src="../assets/images/logo.png" alt="">
        </div>
        <div class="error-message" v-if="errormessage">
            <p>{{ errormessage }}</p>
        </div>
        <div class="input-box">
            <p class="bottom-line"><span></span><input type="text" placeholder="邮箱地址/手机号" v-model="username"></p>
            <p class="bottom-line"><span></span><input type="text" placeholder="验证码" v-model="verify"><a class="send-captcha" v-on:click="verifyHandler">发送验证码</a></p>
            <p class="bottom-line"><span></span><input type="password" placeholder="密码" v-model="password"></p>
            <p><span></span><input type="password" placeholder="验证密码" v-model="comfirmpassword"></p>
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
                comfirmpassword:''
            }
        },
        route:{  
        },
        methods:{
            verifyHandler: function () {
                var that = this
                var userdata = {
                    username: that.username
                }
                if (!that.username) {
                    that.errormessage = '用户名不能为空'
                }else{
                    $.ajax({
                        url: utils.urlpre+"Login/sendVerify",
                        type: "POST",
                        crossDomain: true,
                        data: userdata,
                        dataType: "json",
                        success: function (data) {
                            switch (data.result)
                            {
                                case 'SUCCESS':
                                    that.errormessage = '验证码已发送'
                                    break
                                case 'FAIL':
                                    that.errormessage = '验证码发送失败，请重试'
                                    break
                            }
                               
                        },
                        error: function (xhr, status) {
                            this.errormessage = '网络错误'
                        }
                    })
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
        components:{
        }
    }
</script>

<style lang="less">
@import '../assets/less/common/login-register.less';
</style>