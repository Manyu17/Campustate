<template>
    <xuanxuan-list v-if="showxuanxuan" :xuanxuanitems="xuanxuanitems" transition="fade"></xuanxuan-list>
    <activity-list v-if="!showxuanxuan" :activityitems="activityitems" transition="fade"></activity-list>
</template>
<script>
    export default {
        props: ['xuanxuanitems','activityitems','showxuanxuan'],
        data(){
            return {
               
            }
        },
        ready(){
            
        },
        route:{
              
        },
        methods:{
            getListInitIndex:function() {
                var initIndex
                switch(this.$route.query.type){
                    case 'xuanxuan':
                        initIndex = 0
                        break
                    case 'activity':
                        initIndex = 1
                        break
                    default:
                    initIndex = 0
                }
                return initIndex
            },
            listInit:function() {
                var __self = this
                var tabs = document.getElementById(__self.sliderId.nav).querySelectorAll('a')
                var index = 0
                __self.islider.slideTo(index)
                $("#"+__self.sliderId.nav+" .current").removeClass("current")
                $(tabs[index]).addClass("current")
            }           
        },
        events:{
        },
        components:{
            'xuanxuanList':require('./xuanxuanList.vue'),
            'activityList':require('./activityList.vue')
        }
    }
</script>

<style lang="less">
@import '../assets/less/common/func.less';
</style>