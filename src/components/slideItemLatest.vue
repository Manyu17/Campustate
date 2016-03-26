<template>
	<div id="latest-list-box" class="content-base">
        <list :xuanxuanitems="xuanxuanitems" :activityitems="activityitems" :slider-id="sliderId" :slide-items="listSlideItems" :render-page="renderPage" v-ref:list></list>
    </div>
    
</template>
<script>
    export default {
        props: ['xuanxuanitems','activityitems','renderPage'],
        data (){
            return {
                sliderId:{
                    wrapper:'lasted-list-slider-wrapper',
                    nav:'lasted-list-slider-nav',
                    show:'lasted-list-slider-show',
                    hidden:'lasted-list-slider-hidden',
                    a:'lasted-list-link-'
                },
                listSlideItems:[
                    {
                        id:'lasted-xuanxuan-list'
                    },
                    {
                        id:'lasted-activity-list'
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