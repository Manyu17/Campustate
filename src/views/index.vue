<template>
    <!-- 全局header -->
    <div>
        this is index.vue
    </div>
</template>
<script>
    require('../assets/less/common/reset.less')
    export default {
        ready (){
            setTimeout(() => {
                if(window.localStorage.getItem('token')){
                    this.$route.router.go({name:'home',query:{tab:'topicList'}});
                }else{
                    this.$route.router.go({ name: 'login'});
                }
                
            },2000);
        }
    }
</script>
<style lang="less">
@import '../assets/less/common/func.less';
    div{
        font-size: 20px;
    }
</style>

