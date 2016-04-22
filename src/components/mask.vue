<template>
<div class="mask" v-if="showMask" transition="fade"></div>></div>
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    export default {
        props:['showMask'],
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
.mask{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
}
</style>