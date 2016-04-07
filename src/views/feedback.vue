<style lang="less">
@import '../assets/less/common/func.less';
.feedback-container{
    position: absolute;
    top: 146px;
    left: 20px;
    right: 20px;
    div{
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
    input{
        width: 100%;
        height: 86px;
        line-height: 86px;
        margin-top: 20px;
        padding-left: 20px;
        font-size: 30px;
        border: none;
        box-sizing: border-box;
    }
    textarea{
        width: 100%;
        height: 335px;
        border: none;
        padding: 20px;
        font-size: 30px;
        box-sizing: border-box;
        resize: none;
    }
}

</style>
<template>
    <nv-head header-name="用户反馈"
            left-btn-type="back"
            right-btn-type="submit">
    </nv-head>
    <div class="feedback-container">
        <div>
            <p id="ch"><sup>“</sup>用户至上</p>
            <p id="eg">User oriented<sub>”</sub></p>
        </div>
        <textarea placeholder="输入反馈意见"></textarea>
        <input type="text" placeholder="联系电话/邮箱地址" @blur="checkUsername">
    </div>
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    export default {
        data (){
            return {
                backPath:''
            }
        },
        route:{
            data (transition){
                this.backPath = transition.from.path;
            }
        },
        methods:{
            checkUsername:function() {
                var result = utils.getCheck.checkPhone(this.username)||utils.getCheck.checkEmail(this.username);
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
            "nvHead":require('../components/header.vue')
        }
    }
</script>