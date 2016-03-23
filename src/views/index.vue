<template>
    <!-- 全局header -->
    <div>
        this is index.vue
    </div>
</template>
<script>
    export default {
        ready (){
            setTimeout(() => {
                this.$route.router.go({ name: 'login'});
            },2000);
        }
    }
</script>
<style lang="less">
    div{
        font-size: 20px;
    }
</style>

