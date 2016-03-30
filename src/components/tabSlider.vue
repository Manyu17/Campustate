<template>
	<div id="{{ sliderId.wrapper }}">
        <div id="{{ sliderId.nav }}" :class="{'nav':sliderStyleType=='homeSlide','flexbox':sliderStyleType=='homeSlide','switch-bar':sliderStyleType=='listSlide'}">
            <span v-if="sliderStyleType=='homeSlide'" class="bg"></span>
            <a v-for="item in tabItems" v-text="item.name" id="{{ sliderId.a+$index }}" @click="tabClick"></a>
        </div>
        <div id="{{ sliderId.show }}"></div>
        <div id="{{ sliderId.hidden }}" style="display:none">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['tabItems','sliderStyleType','sliderId'],
        data (){
            return {
            }
        },
        route:{
              
        },
        methods:{
            tabClick:function(e) {
                var id = e.target.id
                var idLastChar = id.charAt(id.length-1)
                var idx = parseInt(idLastChar)
                this.$dispatch('slideTo', idx)
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
    font-size: 28px;/*px*/
    a{
        display: block;
        -moz-box-flex:1.0; /* Firefox */
        -webkit-box-flex:1.0; /* Safari and Chrome */
        box-flex:1.0;
        height: 5.5*16px;
        line-height: 5.5*16px;
        padding: 0 6px;
    }
    .bg{
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        //width: 8*16px;
        border-bottom: 0.375*16px solid @color12;
    }
    .current{
        border-bottom: 0.375*16px solid @color12;
    }
}
#home-slider-wrapper {
    position: absolute;
    top: 5.5*16px;
    bottom: 6.125*16px;
    overflow: hidden;
    width: 100%;
    background-size: 100%;
    -webkit-transition: all .3s;
}
#home-slider-show {
    position: absolute;
    top: 5.5*16px;
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
    top: 5*16px;
    margin-left: auto;
    margin-right: auto;
    height: 100%;
    width: 37.5*16px;
    overflow: hidden;
    overflow-y: auto;
    text-align: center;
    &>ul {
        list-style: none;
        //font-size: 20px;
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