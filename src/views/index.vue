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
                this.$route.router.go({ name: 'login'});
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

