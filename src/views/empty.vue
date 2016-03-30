<style lang="less">
@import '../assets/less/common/func.less';
</style>
<template>
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    export default {
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
            "nvHead":require('../components/header.vue')
            
        }
    }
</script>