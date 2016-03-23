<template>
	<div id="{{ sliderId.wrapper }}">
        <div id="{{ sliderId.nav }}" :class="{'nav':sliderStyleType=='homeSlide','flexbox':sliderStyleType=='homeSlide','switch-bar':sliderStyleType=='listSlide'}">
            <span v-if="sliderStyleType=='homeSlide'" class="bg"></span>
            <a v-for="item in tabItems" v-text="item.name" id="{{ sliderId.a+$index }}" @click="slideTo"></a>
        </div>
        <div id="{{ sliderId.show }}"></div>
        <div id="{{ sliderId.hidden }}" style="display:none">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    import iSlider from '../libs/iSlider'
    export default {
        props: ['tabItems','slideItems','sliderStyleType','sliderId','renderPage'],
        data (){
            return {
                islider:{}
            }
        },
        ready(){
            if(this.sliderStyleType == 'listSlide'){
                if(this.renderPage){
                    this.createIslider()
                }
            }
            this.$watch('renderPage',function() {
                if(this.renderPage){
                    this.createIslider()
                }
            })
            
        },
        attached(){
            if(this.sliderStyleType == 'homeSlide'){
                this.createIslider()
            }
            
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
                switch(__self.sliderStyleType){//根据不同类型绑定不同的slide事件
                    case 'homeSlide':
                        var tabs = document.getElementById(__self.sliderId.nav).querySelectorAll('a')
                        var bg = document.getElementById(__self.sliderId.nav).querySelector('span')
                        var scale = tabs[0].clientWidth/2
                        var index = this.getHomeInitIndex()
                        bg.style.width = scale + 'px'
                        bg.style.left = tabs[index].offsetLeft + tabs[index].clientWidth/2-scale/2 + 'px'
                        this.islider = new iSlider({
                            data: list,
                            dom: document.getElementById(__self.sliderId.show),
                            fixPage: false,
                            initIndex:index
                        })
                        this.islider.on('slideEnd',function() {
                            bg.style.left = tabs[this.slideIndex].offsetLeft + tabs[this.slideIndex].clientWidth/2 -scale/2 + 'px'
                        })    
                        this.islider.on('slideChange',function(idx) {
                            bg.style.left = tabs[this.slideIndex].offsetLeft + tabs[this.slideIndex].clientWidth/2 -scale/2 + 'px'
                            switch(this.slideIndex){
                                case 0:
                                    __self.$route.router.go({name:'home',query:{tab:'heat',type:'xuanxuan'}})
                                    break
                                case 1:
                                    __self.$route.router.go({name:'home',query:{tab:'topicList'}})
                                    break
                                case 2:
                                    __self.$route.router.go({name:'home',query:{tab:'latest',type:'xuanxuan'}})
                                    break
                                case 3:
                                    __self.$route.router.go({name:'home',query:{tab:'follow',type:'xuanxuan'}})
                                    break
                            }
                        }) 
                        this.islider.on('slide',function(event) {
                            var offset = event.offsetRatio
                            bg.style.webkitTransition = 'left .3s ease'
                            bg.style.left = tabs[this.slideIndex].offsetLeft + tabs[this.slideIndex].clientWidth/2 -scale/2 - offset*tabs[this.slideIndex].clientWidth + 'px'
                        }) 
                        break
                    case 'listSlide':
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
                                    __self.$route.router.go({name:'home',query:{tab:__self.$route.query.tab,type:'xuanxuan'}})
                                    break
                                case 1:
                                    __self.$route.router.go({name:'home',query:{tab:__self.$route.query.tab,type:'activity'}})
                                    break
                            }
                        })
                        this.islider.on('slide',function(event) {
                            event.cancelBubble = true
                        }) 
                        break
                }
                
            },
            slideTo:function(e) {
                var id = e.target.id
                var idLastChar = id.charAt(id.length-1)
                var idx = parseInt(idLastChar)
                this.islider.slideTo(idx)
            },
            getHomeInitIndex:function() {
                var initIndex
                switch(this.$route.query.tab){
                    case 'heat':
                        initIndex = 0
                        break
                    case 'topicList':
                        initIndex = 1
                        break
                    case 'latest':
                        initIndex = 2
                        break
                    case 'follow':
                        initIndex = 3
                        break
                    default:
                        initIndex = 1
                }
                return initIndex
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
            }
        },
        components:{
            
        }
    }
</script>

<style lang="less">
@import '../assets/less/common/componentBase.less';
@import '../assets/less/common/basic.less';

.nav{
    background-color: @color2;
    color: @color12;
    font-size: 14px;
    a{
        display: block;
        -moz-box-flex:1.0; /* Firefox */
        -webkit-box-flex:1.0; /* Safari and Chrome */
        box-flex:1.0;
        height: 5.5rem;
        line-height: 5.5rem;
        padding: 0 6px;
    }
    .bg{
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        //width: 8rem;
        border-bottom: 0.375rem solid @color12;
    }
    .current{
        border-bottom: 0.375rem solid @color12;
    }
}
#home-slider-wrapper {
    position: absolute;
    top: 5.5rem;
    bottom: 6.125rem;
    overflow: hidden;
    width: 100%;
    background-size: 100%;
    -webkit-transition: all .3s;
}
#home-slider-show {
    position: absolute;
    top: 5.5rem;
    bottom: 0;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    overflow: hidden;
    overflow-y: auto;
    &>ul {
        list-style: none;
        margin: 0;
        padding: 0;
        height: 100%;
        overflow: hidden;
        &>li {
            position: absolute;
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            //display: -webkit-box;
            //-webkit-box-pack: center;
            //-webkit-box-align: center;
            list-style: none;
        }
    }
    

}
div[id$="list-slider-wrapper"]{
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-size: 100%;
    -webkit-transition: all .3s;
}
div[id$="list-slider-show"]{
    position: absolute;
    top: 5rem;
    margin-left: auto;
    margin-right: auto;
    height: 100%;
    width: 450px;
    overflow: hidden;
    overflow-y: auto;
    text-align: center;
    &>ul {
        list-style: none;
        margin: 0;
        padding: 0;
        height: 100%;
        overflow: hidden;
        &>li {
            position: absolute;
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            //display: -webkit-box;
            //-webkit-box-pack: center;
            //-webkit-box-align: center;
            list-style: none;
        }
    }
}
</style>