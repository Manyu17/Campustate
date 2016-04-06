<template>
    <div class="switch-bar">
        <a id="hot-topic-btn"class="topic" :class="{'current':showxuanxuan}" @click="xuanxuanHandler">喧 喧</a><a id="hot-event-btn" class="event" :class="{'current':!showxuanxuan}" @click="activityHandler">活 动</a>
    </div>
</template>
<script>
    export default {
        props:['showxuanxuan'],
        data(){
            return {
               
            }
        },
        ready(){
            
        },
        route:{
              
        },
        methods:{
            xuanxuanHandler:function() {
                this.showxuanxuan = true
                this.$dispatch('routeChange', 'xuanxuan')
            },
            activityHandler:function() {
                this.showxuanxuan = false
                this.$dispatch('routeChange', 'activity')
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
</style>