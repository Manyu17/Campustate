<template>
	<div class="login-register-container" id="login-box">
        <div class="head-pic">
            <img src="" alt="">
        </div>
        <div class="error-message" v-if="errormessage">
            <p>{{ errormessage }}</p>
        </div>
        <div class="input-box">
            <p><span></span><input class="username" type="text" placeholder="邮箱地址/手机号" v-model="username"></p>
            <p><span></span><input class="username" type="text" placeholder="验证码" v-model="verify"><a class="send-captcha" v-on:click="verifyHandler">发送验证码</a></p>
            <p><span></span><input class="password" type="password" placeholder="密码" v-model="password"></p>
        </div>
        <a class="button main-btn" v-on:click="registerHandler">注 册</a>
        <a class="button" v-link="{name:'login'}">登 录</a>
    </div>
</template>
<script>
    import utils from  '../libs/utils'
    export default {
        data (){
            return {
                errormessage:'',
                username: '',
                verify:'',
                password: ''
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
@import '../assets/less/common/viewBase.less';
.login-register-container{
    background-color: #f1f1f1;
    padding: 0 72/16rem;
    .head-pic{
        width: 100%;
        text-align: center;
        img{
            width: 204/16rem;
            height: 204/16rem;
            border-radius: 50%;
            border: 1rem solid #dfdfdf;
            margin-top: 72/16rem;
            margin-bottom: 50/16rem;
        }
    }
    .error-message{
        p{
            height: 68/16rem;
            line-height: 68/16rem;
            color: #9a9a9a;
            font-size: 20px;
            &:before{
                display: inline-block;
                width: 68/16rem;
                height: 68/16rem;
                font-size: 32px;
                line-height: 68/16rem;
                text-align: center;
            }
        }
    }
    .input-box{
        margin-bottom: 26/16rem;
        p{
            height: 96/16rem;
            line-height: 96/16rem;
            background-color: #cbcbcb;
            position: relative;
        }
        span{
            display: inline-block;
            width: 96/16rem;
            height: 96/16rem;
            line-height: 96/16rem;
            text-align: center;
            color: #fff;
            vertical-align: middle;
        }
        input{
            width: 372/16rem;
            height: 80/16rem;
            color: #fff;
            font-size: 14px;
            border: none;
            background-color: #cbcbcb;
            vertical-align: middle;
            outline: none;
            margin-top: -10/16rem;
        }
        input::-webkit-input-placeholder{
            color: #fff;
            font-size: 14px;
            font-family: "MicroSoft YaHei";
        }
        input::-moz-input-placeholder{
            color: #fff;
            font-size: 26px;
            font-family: "MicroSoft YaHei";
        }
        .username{
            border-bottom: 2/16rem solid #e1e1e1;
        }
        a{
            display: inline-block;
            position: absolute;
            width: 124/16rem;
            height: 53/16rem;
            line-height: 53/16rem;
            background-color: #9a9a9a;
            font-size: 10px;
            color: #fff;
            text-align: center;
            right: 1rem;
            top: 1.3rem;
        }
    }
    .button{
        display: block;
        width: 100%;
        height: 72/16rem;
        line-height: 72/16rem;
        text-align: center;
        color: #fff;
        font-size: 14px;
        background-color:#cbcbcb;
        border: none;
        outline: none;
        font-family: "MicroSoft YaHei";
        margin-bottom: 20/16rem;
    }
    .main-btn{
        background-color: #848484;
    }
    .forget-password{
        height: 60/16rem;
        line-height: 60/16rem;
        text-align: center;
        a{
            font-size: 12px;
            color: #9a9a9a;
        }
    }
}
</style>