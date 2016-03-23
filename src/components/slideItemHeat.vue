<template>
    <div id="heat-list-box" class="content-base">
        <div class="banner" id="hot-ad"><a href="{{ ad.link }}"><img v-bind:src="ad.image" alt="" id="{{ ad.id }}"></a></div>
        <list :xuanxuanitems="xuanxuanitems" :activityitems="activityitems" :slider-id="sliderId" :slide-items="listSlideItems" :render-page="renderPage"></list>
    </div>   
</template>
<script>
    export default {
        props: ['xuanxuanitems','activityitems','ad','renderPage'],
        data (){
            return {
                sliderId:{
                    wrapper:'heat-list-slider-wrapper',
                    nav:'heat-list-slider-nav',
                    show:'heat-list-slider-show',
                    hidden:'heat-list-slider-hidden',
                    a:'heat-list-link-'
                },
                listSlideItems:[
                    {
                        id:'heat-xuanxuan-list'
                    },
                    {
                        id:'heat-activity-list'
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
.banner{
    width: 100%;
    height: 276/16rem;
    text-align: center;
    overflow: hidden;
    img{
        width: 37.5rem;
        height: 276/16rem;
    }
}
</style>