<template>
<div class="show-pictures">
    <div id="show-pictures-wrapper" @click="hidePictures"></div>
    <ul class="dot">
        <li v-for="item in images" :class="{'current':$index==currentDot}"></li>
    </ul>
</div>
</template>
<script>
    require('../assets/less/common/reset.less')
	import utils from  '../libs/utils'
    import iSlider from '../libs/iSlider'
    export default {
        props:['images','index'],
        data (){
            return {
                currentDot:this.index
            }
        },
        ready(){
        },
        attached(){
            this.createIslider()
        },
        route:{
            data (transition){
                

            },
            deactivate (transition){
                transition.next();
            }
        },
        methods:{
            createIslider:function() {
                var list = []
                var __self = this

                for (var item in this.images){
                    list[item] = {}
                    list[item].content = this.images[item]
                    
                }
                var islider = new iSlider({
                    dom: document.getElementById("show-pictures-wrapper"),
                    data:list,
                    initIndex:__self.index,
                    onslidechanged:function(event) {
                        __self.currentDot = event
                    }
                })    
            },
            hidePictures:function() {
                this.$dispatch('hidePictures')
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
.show-pictures{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    z-index: 9;
}
#show-pictures-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    background-color: black;
    
    overflow: hidden;
    background-size: 100%;
    -webkit-transition: all .3s;
    .islider-outer{
        position: relative;
        height: 100%;
        li{
            position: absolute;
            width:100%;
            height: 100%;
        }
        img{
            position: absolute;
            top: 50%;
            left: 50%;
            transform:translate(-50%,-50%);
        }
    }
}
.dot{
    position: absolute;
    bottom: 20px;
    z-index: 10;
    width: 100%;
    text-align: center;
    li{
        list-style: none;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 1px solid @card-white5;/*no*/
        margin-right: 6px;
    }
    .current{
        background-color: @card-white5;
    }
}
</style>