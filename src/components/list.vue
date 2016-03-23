<template>
    <tab-slider :tab-items="tabItems" :slide-items="slideItems" :slider-id="sliderId" slider-style-type="listSlide" :render-page="renderPage">
        <xuanxuan-list :xuanxuanitems="xuanxuanitems" :list-id="slideItems[0].id"></xuanxuan-list>
        <activity-list :activityitems="activityitems" :list-id="slideItems[1].id"></activity-list>
    </tab-slider>
</template>
<script>
    export default {
        props: ['xuanxuanitems','activityitems','sliderId','slideItems','renderPage'],
        data (){
            return {
                tabItems:[
                    {
                        name:'喧喧'
                    },
                    {
                        name:'活动'
                    }
                ],
                sliderStyleType:'listSlide'
            }
        },
        route:{
              
        },
        methods:{
            
        },
        components:{
            'xuanxuanList':require('./xuanxuanList.vue'),
            'activityList':require('./activityList.vue'),
            'tabSlider':require('./tabSlider.vue')
        }
    }
</script>

<style lang="less">
</style>