<template>
    <div id="follow-list-box" class="content-base">
        <list :xuanxuanitems="xuanxuanitems" :activityitems="activityitems" :slider-id="sliderId" :slide-items="listSlideItems" :render-page="renderPage" v-ref:list></list>
    </div>
    
</template>
<script>
    export default {
        props: ['xuanxuanitems','activityitems','renderPage'],
        data (){
            return {
                sliderId:{
                    wrapper:'follow-list-slider-wrapper',
                    nav:'follow-list-slider-nav',
                    show:'follow-list-slider-show',
                    hidden:'follow-list-slider-hidden',
                    a:'follow-list-link-'
                },
                listSlideItems:[
                    {
                        id:'follow-xuanxuan-list'
                    },
                    {
                        id:'follow-activity-list'
                    }
                ]
            }
        },
        route:{
              
        },
        methods:{
            
        },
        components:{
            "list":require('./list.vue')
        }
    }
</script>

<style lang="less">

</style>