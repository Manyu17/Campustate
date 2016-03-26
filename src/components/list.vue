<template>
    <tab-slider :tab-items="tabItems" :slider-id="sliderId" slider-style-type="listSlide">
        <xuanxuan-list :xuanxuanitems="xuanxuanitems" :list-id="slideItems[0].id"></xuanxuan-list>
        <activity-list :activityitems="activityitems" :list-id="slideItems[1].id"></activity-list>
    </tab-slider>
</template>
<script>
    import iSlider from '../libs/iSlider'
    export default {
        props: ['xuanxuanitems','activityitems','sliderId','slideItems','renderPage'],
        data(){
            return {
                islider:{},
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
        ready(){
            if(this.renderPage){
                this.createIslider()
            }
            this.$watch('renderPage',function() {
                if(this.renderPage){
                    this.createIslider()
                }
            })
            
        },
        route:{
              
        },
        methods:{
            createIslider:function() {
                var __self = this
                var list = []
                var slideItems = this.slideItems
                for(var item in slideItems){
                    var temp = {}
                    temp.content = document.getElementById(slideItems[item].id)
                    list.push(temp)
                }
                var tabs = document.getElementById(__self.sliderId.nav).querySelectorAll('a')
                var index = this.getListInitIndex()
                $(tabs[index]).addClass("current")
                this.islider = new iSlider({
                    data: list,
                    dom: document.getElementById(__self.sliderId.show),
                    fixPage: false,
                    initIndex:index
                })
                this.islider.on('slideEnd',function() {
                    $("#"+__self.sliderId.nav+" .current").removeClass("current")
                    $(tabs[this.slideIndex]).addClass("current")
                })    
                this.islider.on('slideChange',function(idx) {
                    $("#"+__self.sliderId.nav+" .current").removeClass("current")
                    $(tabs[this.slideIndex]).addClass("current")
                    switch(this.slideIndex){
                        case 0:
                            __self.$dispatch('routeChange', 'xuanxuan')
                            break
                        case 1:
                            __self.$dispatch('routeChange', 'activity')
                            break
                    }
                })
                this.islider.on('slide',function(event) {
                    event.cancelBubble = true
                }) 
            },
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
            'slideTo':function(idx) {
                this.islider.slideTo(idx)
            }
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