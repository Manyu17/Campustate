<template>
    <a class="send-captcha" :class="{'inactive':!active}" @click="clickHandler">{{ text }}</a>
</template>

<script>
    import utils from  '../libs/utils'
    export default {
        props: ['text','active','username'],
        data (){
            return {
                timer:'',
                time:60
            }
        },
        methods: {
            clickHandler:function() {
                if(this.active){
                    this.active = false
                    this.text = this.time+'s后重新发送'
                    this.countDown()
                    this.verifyHandler()
                }
            },
            countDown:function() {
                var __self = this
                if(__self.time>0){
                    this.timer = setInterval(__self.decrease,1000)
                }
            },
            decrease:function() {
                if(this.time>0){
                    this.time--
                    this.text = this.time+'s后重新发送'
                }else{
                    clearInterval(this.timer)
                    this.timer = ''
                    this.text = '发送验证码'
                    this.active = true
                }
            },
            verifyHandler:function() {
                var that = this
                var userdata = {
                    username: that.username
                }
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
                                that.$dispatch('verifySended')
                                break
                            case 'FAIL':
                                that.$dispatch('verifySendFault')
                                break
                        }
                           
                    },
                    error: function (xhr, status) {
                        this.$dispatch('ajaxError')
                    }
                })
            }
        },
        components:{
            
        }
    }
</script>
<style lang="less">
@import '../assets/less/common/func.less';

</style>