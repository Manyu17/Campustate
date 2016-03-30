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
            <p><span></span><input class="password" type="password" placeholder="密码" v-model="password"></p>
        </div>
        <a class="button main-btn" v-on:click="loginHandler">登 录</a>
        <a class="button" v-link="{name: 'register'}">注 册</a>
        <div class="forget-password">
            <a href="">忘记密码?</a>
        </div>
    </div>
</template>
<script>
    import utils from  '../libs/utils'
    export default {
        data (){
            return {
                errormessage:'',
                username: '',
                password: ''
            }
        },
        route:{  
        },
        methods:{
            loginHandler: function () {
                var that = this
                var userdata = {
                    username: that.username,
                    password: that.password
                }
                if (!that.username) {
                    that.errormessage = '用户名不能为空'
                }else if(!that.password){
                    that.errormessage = '密码不能为空'
                }else{
                    $.ajax({
                        url: utils.urlpre+"Login/login",
                        type: "POST",
                        crossDomain: true,
                        data: userdata,
                        dataType: "json",
                        success: function (data) {
                            switch (data.result)
                            {
                                case 'SUCCESS':
                                    window.localStorage.setItem('user_id',data.data.user_id)
                                    window.localStorage.setItem('token',data.data.token)
                                    that.$route.router.go({ name: 'home',query:{tab:'topicList'}})
                                    break
                                case 'FAIL':
                                    switch (data.reason){
                                        case 'NOT FOUND':
                                            console.log(that)
                                            that.username = ''
                                            that.password = ''
                                            that.errormessage = '用户不存在'
                                            break
                                        case 'INCORRECT PASSWORD':
                                            console.log(that)
                                            that.password = ''
                                            that.errormessage = '密码错误'
                                            break
                                    }
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
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #f1f1f1;
    padding: 0 72px;
    .head-pic{
        width: 100%;
        text-align: center;
        img{
            width: 204px;
            height: 204px;
            border-radius: 50%;
            border: 1*16px solid #dfdfdf;
            margin-top: 72px;
            margin-bottom: 50px;
        }
    }
    .error-message{
        p{
            height: 68px;
            line-height: 68px;
            color: #9a9a9a;
            font-size: 20px;/*px*/
            &:before{
                display: inline-block;
                width: 68px;
                height: 68px;
                font-size: 32px;/*px*/
                line-height: 68px;
                text-align: center;
            }
        }
    }
    .input-box{
        margin-bottom: 26px;
        p{
            height: 96px;
            line-height: 96px;
            background-color: #cbcbcb;
            position: relative;
        }
        span{
            display: inline-block;
            width: 96px;
            height: 96px;
            line-height: 96px;
            text-align: center;
            color: #fff;
            vertical-align: middle;
        }
        input{
            width: 372px;
            height: 80px;
            color: #fff;
            font-size: 28px;/*px*/
            border: none;
            background-color: #cbcbcb;
            vertical-align: middle;
            outline: none;
            margin-top: -10px;
        }
        input::-webkit-input-placeholder{
            color: #fff;
            font-size: 28px;/*px*/
            font-family: "MicroSoft YaHei";
        }
        input::-moz-input-placeholder{
            color: #fff;
            font-size: 26px;/*px*/
            font-family: "MicroSoft YaHei";
        }
        .username{
            border-bottom: 2px solid #e1e1e1;
        }
        a{
            display: inline-block;
            position: absolute;
            width: 124px;
            height: 53px;
            line-height: 53px;
            background-color: #9a9a9a;
            font-size: 20px;/*px*/
            color: #fff;
            text-align: center;
            right: 1*16px;
            top: 1.3*16px;
        }
    }
    .button{
        display: block;
        width: 100%;
        height: 72px;
        line-height: 72px;
        text-align: center;
        color: #fff;
        font-size: 28px;/*px*/
        background-color:#cbcbcb;
        border: none;
        outline: none;
        font-family: "MicroSoft YaHei";
        margin-bottom: 20px;
    }
    .main-btn{
        background-color: #848484;
    }
    .forget-password{
        height: 60px;
        line-height: 60px;
        text-align: center;
        a{
            font-size: 24px;/*px*/
            color: #9a9a9a;
        }
    }
}
</style>