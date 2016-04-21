<template>
<ul class="select-box" transition="slideUp">
    <li v-for="item in chooseList" @click="ChooseItem">{{ item }}</li>
</ul>
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    export default {
        props:['chooseList','currentChoose'],
        data (){
            return {
                
            }
        },
        ready(){
        },
        attached(){
        },
        route:{
            data (transition){
            },
            deactivate (transition){
                transition.next();
            }  
        },
        methods:{
            ChooseItem:function(event) {
                this.currentChoose = event.target.innerHTML
                this.$dispatch('selected',this.currentChoose)
            }
        },
        events:{
            
        },
        components:{
            
        }
    }
</script>
<style lang="less">
@import '../assets/less/common/func.less';
@import '../assets/less/common/transition.less';
.select-box{
    position: absolute;
    left: 0;
    right: 0;
    padding:20px;
    background-color: @card-white5;
    bottom: 0;
    z-index: 100;
    li{
        height: 74px;
        line-height: 74px;
        font-size: 28px;/*px*/
        border-bottom: 1px solid @font-gray3;
        text-align: center;
    }
    li:last-child{
        border: none;
    }
}
</style>