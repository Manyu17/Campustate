<template>
	<div class="login-register-container" id="login-box">
        <div class="head-pic">
            <img src="../assets/images/logo.png" alt="">
        </div>
        <div class="error-message" v-if="errormessage">
            <p class="icon iconfont icon-jinggao">{{ errormessage }}</p>
        </div>
        <div class="input-box">
            <p class="bottom-line"><span class="icon iconfont icon-user"></span><input type="text" placeholder="邮箱地址/手机号" v-model="username"></p>
            <p><span class="icon iconfont icon-iconlock"></span><input type="password" placeholder="密码" v-model="password"></p>
        </div>
        <a class="button main-btn" v-on:click="loginHandler">确 认 登 录</a>
        <a class="button" v-link="{name: 'register'}">注&nbsp;&nbsp;册</a>
        <div class="forget-password">
            <a href="">忘记密码?</a>
        </div>
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
@import '../assets/less/common/login-register.less';
</style>