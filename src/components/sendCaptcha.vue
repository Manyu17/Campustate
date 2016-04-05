<template>
    <a class="send-captcha" :class="{'inactive':!active}" @click="clickHandler">{{ text }}</a>
</template>

<script>
    export default {
        props: ['text','active'],
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
                    this.$dispatch('verifyHandler')
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
            }
        },
        components:{
            
        }
    }
</script>
<style lang="less">
@import '../assets/less/common/func.less';

</style>