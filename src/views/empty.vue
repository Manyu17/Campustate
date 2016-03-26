<template>
</template>
<script>
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

<style lang="less">

</style>