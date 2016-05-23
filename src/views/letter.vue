<style lang="less">
@import '../assets/less/common/func.less';
.letter-wrap{
    position: absolute;
    top: 106px;
    left: 0px;
    right: 0px;
    .receive, .send {
        width: 100%;
        clear: both;        
        .letter {
            background-color: @card-white5;
            padding: 20px;
            margin-bottom: 40px;
            min-height: 38px;
            max-width: 350px;
            font-size: 25px;
            line-height: 38px;
            border-radius: 5px;
        }
        img {
            width: 88px;
            height: 88px;
            border-radius: 50%;
            margin-bottom: 40px;
            margin-left: 40px;
            margin-right: 40px;
        }
    }
    .receive {
        img {
            float: left;
        }
        .letter {
            float: left;
            position: relative;
            span {
                display: block;
                position: absolute;
                top: 20px;
                left: -38px;
                width: 0;
                height: 0;
                border-right: 20px solid @card-white5;
                border-top: 20px solid rgba(0,0,0,0);
                border-left: 20px solid rgba(0,0,0,0);
                border-bottom: 20px solid rgba(0,0,0,0);
            }
        }
    }
    .send {
        img {
            float: right;
        }
        .letter {
            float: right;
            position: relative;
            span {
                display: block;
                position: absolute;
                top: 20px;
                right: -38px;
                width: 0;
                height: 0;
                border-left: 20px solid @card-white5;
                border-top: 20px solid rgba(0,0,0,0);
                border-right: 20px solid rgba(0,0,0,0);
                border-bottom: 20px solid rgba(0,0,0,0);
            }
        }
    }
}
.input-wrap {
    position: absolute;
    bottom: 0;
    height: 98px;
    line-height: 98px;
    width: 100%;
    background-color: @background-gray4;
    box-shadow: 1px 1px 20px 8px rgba(162, 162, 162, 0.263);
    input {
        height: 58px;
        width: 70%;
        padding: 0 20px; 
        margin: 0 20px;
    }
    button {
        height: 58px;
        width: 12%;
        background-color: @blue1;
        font-size: 20px;
        color: #fff;
        border: none;
        border-radius: 5px;
    }
}
</style>
<template>
    <nv-head header-name="傻咖璐"
            left-btn-type="back">
    </nv-head>
    <div class="letter-wrap">
        <div v-for="letter in letters" :class="letter.source">
            <img :src="letter.header">
            <div class="letter"> 
                {{letter.letter}} 
                <span></span>
            </div>
        </div>
    </div>
    <div class="input-wrap">
        <input type="text" placeholder="编辑" v-model="message">
        <button v-on:click="sendLetter">发送</button>
    </div>
</template>
<script>
    require('../assets/less/common/reset.less')
    require('../assets/less/iconfont/iconfont.css')
    import utils from  '../libs/utils'
    export default {
        data (){
            return {
                backPath:'',
                userdata: {},
                message: '',
                letters: [{
                    source: "receive",
                    letter: "报名成功！报名成功！报名成功！报名成功！报名成功！报名成功！报名成功！报名成功！报名成功！报名成功！报名成功！报名成功！",
                    header: "http://7xpks6.com1.z0.glb.clouddn.com/FjBCDRqa-yvLYDNYElaa9ENaWc4X"
                },{
                    source: "send",
                    letter: "谢谢！",
                    header: "http://7xpks6.com1.z0.glb.clouddn.com/FjBCDRqa-yvLYDNYElaa9ENaWc4X"
                }]
            }
        },
        route:{
            data (transition){
                this.backPath = transition.from.path
            }
        },
        methods:{
            sendLetter: function() {
                var self = this;
                var newLetter = {
                    source: "send",
                    letter: self.message,
                    header: "http://7xpks6.com1.z0.glb.clouddn.com/FjBCDRqa-yvLYDNYElaa9ENaWc4X"
                }
                self.letters.push(newLetter);
                self.message = '';
            }
        },
        events:{
            'headerLeftBtnClick':function() {
                this.$route.router.go(this.backPath);
            }
        },
        ready () {
            var self = this;
            self.userdata.user_id = window.localStorage.getItem('user_id');
            self.userdata.token = window.localStorage.getItem('token');

            // $.ajax({
            //     url: utils.urlpre+"comment/unreadcomment",
            //     type: "POST",
            //     crossDomain: true,
            //     data: self.userdata,
            //     dataType: "json",
            //     success: function (data) {
            //         console.log(data);
            //         self.comments = data.data;
            //     },
            //     error: function (xhr, status) {
            //         console.log('网络错误');
            //     }
            // })
        },
        components:{
            "nvHead":require('../components/header.vue'),
        }
    }
</script>